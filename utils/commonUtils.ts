export class CommonUtils {

    getCurrentDate(data: string) {
        let date = data != undefined ? new Date(data) : new Date()
        let day = '' + date.getDate()
        let year = date.getFullYear()
        if (day.length < 2) day = '0' + day;
        return [day, date.toLocaleString('en-US', { month: 'short' }), year].join('-')
    }

    static generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
        }
        return result;
      };




}