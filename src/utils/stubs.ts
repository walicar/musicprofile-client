export const stubString = (opt?: string): string => {
    return opt ? `stub ${opt}` : 'stub';
}

export const stubCookie = () => {
    return document.cookie;
}

export const stubAsyncPass = async (): Promise<any> => {
    const promise = new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve("pass");
        }, 1000);
    });
    return promise;
}

export const stubAsyncFail = async (): Promise<any> => {
    const promise = new Promise((_resolve, reject) => {
        setTimeout(() => {
            reject("reject");
        }, 1000);
    });
    return promise;
}