export const extractPublicId = (url) => {
    console.log(url);
    const regex = /(?:image\/upload\/(?:v\d+\/)?)([^.]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
};
