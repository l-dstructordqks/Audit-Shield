from fastapi import APIRouter, UploadFile
from api.models.scan import ScanResult, PackageResult, TextScanRequest
from api.scanners.requirements_parser import parse_requirements
from api.scanners.osv_client import fetch_vulnerabilities
from api.scanners.pypi_client import get_package_info, is_outdated
from core_logic.scoring import _score_vulns, build_action_message, calculate_audit_score, score_to_level

router = APIRouter(prefix='/api/v1', tags=['Audit-Shield'])

def _build_package_result(dependency: dict) -> dict:

    name = dependency['name']
    version = dependency['version']

    vulns = fetch_vulnerabilities(name, version)
    info = get_package_info(name)
    outdated = is_outdated(version, info['latest_version'])
    vuln_score = _score_vulns(vulns)

    return {
        'name': name,
        'current_version': version,
        'latest_version': info['latest_version'],
        'days_since_update': info['days_since_update'],
        'is_outdated': outdated,
        'vulnerabilities': vulns,
        'risk_level': score_to_level(vuln_score),
        'action': build_action_message(name, info['latest_version']) if outdated else 'No update required',
    }

def _build_scan_result(content: str) -> ScanResult:

    parsed   = parse_requirements(content)
    packages = [_build_package_result(dep) for dep in parsed]
    audit_result   = calculate_audit_score(packages)

    return {
        'packages': packages,
        'audit_score': audit_result['score'],
        'audit_level': audit_result['level'],
        'breakdown': audit_result['breakdown'],
    }

@router.post('/scan')
async def scan_requirements(file: UploadFile) -> ScanResult:

    content = await file.read()
    return _build_scan_result(content.decode())


@router.post('/scan/text')
async def scan_from_text(body: TextScanRequest) -> ScanResult:

    return _build_scan_result(body.content)


@router.get('/package/{package_name}')
async def get_package_detail(package_name: str, version: str | None = None) -> PackageResult:

    dependency = {'name': package_name, 'version': version}
    return _build_package_result(dependency)
    
