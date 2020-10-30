export default function useMiddlewares({ element }){

    return {

        execute: function({ middlewaresList }){

            const [first, ...next] = middlewaresList;

            if(!first(element)){

                return element.dispatchEvent(new CustomEvent("invalid", { detail: middlewaresList.length }));
            }

            if(next.length){

                return this.execute(next);
            }

            element.dispatchEvent(new Event("valid"));
        }
    }
}