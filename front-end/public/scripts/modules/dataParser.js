export default function dataParser(){

    return {
        dateParser: function(data){

            const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
            const splittedDate = data.inicio.split("-");
            const monthIndex = Number.parseInt(splittedDate[1]) - 1;
            const month = months[monthIndex];
            const year = splittedDate[0];

            return { ...data, "month": month, "year": year }
        }
    }
}