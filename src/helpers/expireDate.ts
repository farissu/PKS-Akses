export default function calculateDaysUntilExpiration(expirationDateStr: any) {

    if (expirationDateStr != null) {
        // Parse the expiration date string into a Date object
        const expirationDate = new Date(expirationDateStr.replace(" ", "T"));

        // Get today's date
        const today = new Date();

        // Calculate the difference in milliseconds
        // @ts-ignore
        const differenceInMilliseconds = expirationDate - today;

        // Calculate the difference in days
        const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        if (differenceInDays < 0) {
            return { message: "Berakhir", isCheckoutDisabled: true };
        } else {
            return { message: differenceInDays + " Hari lagi", isCheckoutDisabled: false }
        }
    } return { message: "∞", isCheckoutDisabled: false };

}
