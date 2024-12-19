export const applyFilters = (item, filters) => {
    const { field, operation, value } = filters;
    const itemValue = item[field];

    switch (operation) {
        case "EQUAL":
            if (itemValue !== value) return false;
            break;
        case "NOT_EQUAL":
            if (itemValue === value) return false;
            break;
        case "CONTAINS":
            if (!String(itemValue).includes(value)) return false;
            break;
        case "NOT_CONTAINS":
            if (String(itemValue).includes(value)) return false;
            break;
        case "GREATER":
            if (itemValue <= value) return false;
            break;
        case "GREATER_OR_EQUAL":
            if (itemValue < value) return false;
            break;
        case "LESS":
            if (itemValue >= value) return false;
            break;
        case "LESS_OR_EQUAL":
            if (itemValue > value) return false;
            break;
        default:
            throw new Error(`Unsupported filter operation: ${operation}`);
    }

    return true;
};
