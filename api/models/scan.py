from pydantic import BaseModel
from typing import Optional

class Vulnerability(BaseModel):
    id: str
    severity: str           # 'UNKNOWN' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
    cvss_score: float|None
    description: str|None
    link: str

class PackageResult(BaseModel):
    name: str
    current_version: Optional[str]
    latest_version: Optional[str]
    days_since_update: int|None
    is_outdated: bool
    vulnerabilities: list[Vulnerability]
    risk_level: str           # 'GREEN' | 'YELLOW' | 'RED'
    action: str

class ScanResult(BaseModel):
    packages: list[PackageResult]
    audit_score: int          # 0-100
    audit_level: str          # 'GREEN' | 'YELLOW' | 'RED'
    breakdown: dict           

