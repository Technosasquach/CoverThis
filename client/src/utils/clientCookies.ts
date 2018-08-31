export default {
    getCookie(cname: String): string {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },

    setCookie(cookieName: string, cookieValue: string, nDays: number) {
        const today = new Date();
        const expire = new Date();
        if (nDays == undefined || nDays == 0) nDays = 1;
        expire.setTime(today.getTime() + 3600000 * 24 * nDays);
        document.cookie = cookieName + "=" + escape(cookieValue)
                        + ";expires=" + expire.toUTCString();
    }
};
