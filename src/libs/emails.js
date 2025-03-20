
export const sendEmail = {
    async sendBill(id, userEmail, userName){
        try {
            const res = await fetch(process.env.BASE_URL+"/api/email/bill", {
                method: "POST",
                body: JSON.stringify({id, userEmail, userName}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return res;
        } catch (error) {
            return error.message
        }
    },
    async sendForgotPasswordEmail(userEmail, userName, userId){
        try {
            const res = await fetch(process.env.BASE_URL+"/api/email/forgotPassword", {
                method: "POST",
                body: JSON.stringify({userEmail, userName, userId}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return res;
        } catch (error) {
            return error.message
        }
    }
}