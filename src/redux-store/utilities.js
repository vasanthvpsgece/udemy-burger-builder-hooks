export const updateObject = (originalObject, updatedProperties) => {
    return {
        ...originalObject,
        ...updatedProperties
    }
}