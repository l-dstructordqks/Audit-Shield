// src/utils/colors.ts
const colors: Record<string, string> = {
    GREEN: '#28A745',
    YELLOW: '#FFC107',
    RED: '#DC3545',
    UNKNOWN: '#6C757D',
}
const SEVERITY_COLORS: Record<string, string> = {
    CRITICAL: "#B00020",
    HIGH:     "#FD7E14",
    MEDIUM:   "#FFE100",
    LOW:      "#17A2B8",
    UNKNOWN: '#ADB5BD',
};

export const getColorFromNumber = (score: number|undefined): string => {
    if (score >= 70) {
        return colors.RED;
    } else if (score >= 40) {
        return colors.YELLOW;
    } else if (score >= 0) {
        return colors.GREEN;
    } else {
        return '#7F8C8D';
    }
};

export const getColor = (level: string): string => {
    switch (level.toUpperCase()) {
        case 'GREEN': return colors.GREEN;
        case 'YELLOW': return colors.YELLOW;
        case 'RED': return colors.RED;
        default: return '#7F8C8D'; // UNKNOWN
    }
};

export const getColorFromSeverity = (severity: string): string => {
    switch (severity.toUpperCase()) {
        case 'CRITICAL': return SEVERITY_COLORS.CRITICAL;
        case 'HIGH': return SEVERITY_COLORS.HIGH;
        case 'MEDIUM': return SEVERITY_COLORS.MEDIUM;
        case 'LOW': return SEVERITY_COLORS.LOW;
        default: return '#7F8C8D'; // UNKNOWN
    }
};



export const getRiskFromLevel = (level: string): string => {
    switch (level.toUpperCase()) {
        case 'GREEN': return 'NORMAL';
        case 'YELLOW': return 'WARNING';
        case 'RED': return 'CRITICAL ';
        default: return 'UNKNOWN'; // UNKNOWN
    }
};

