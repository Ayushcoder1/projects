import { useAtom, useAtomValue } from "jotai";
import Filter from "./components/Filter";
import { filteredAtom } from "./store/atoms";
import TODO from "./components/TODO";
import Card from "./components/Card";
import Navbar from "./components/Navbar";

function Analyse(){
    const [filteredTodos, ] = useAtom(filteredAtom);
    return (
        <div>
            <div>
                <Navbar isTodos={0}/>
            </div>
           <div>
            <Filter />
           </div>
           {filteredTodos.map(function(todo){
            // console.log(todo);
            return <Card  key={todo.id}>
            <TODO todo={todo}/>
            </Card>
            })}
        </div>
    )
}

export default Analyse;