import Image from "next/image";
import Nature from '@/assets/nature.jpg'

import HeavyComponent from "@/component/HeavyComponent";
import dynamic from "next/dynamic";

import { useState } from "react";

const HeavyComponent = dynamic(() => import('@/component/HeavyComponent'), { ssr: false, loading: () => (<p>Loading...</p>) })

export default function About() {
    const [show, setShow] = useState<boolean>(false);
    
    return (

        <div>
            <h1>About Me</h1>
            {/* <img {...Nature}/>   */}
            {/* <img src="/nature.jpg"/>   */}
            {/* <Image src={Nature} alt="nature-img" width={300} height={300}/>   */}

            <button onClick={() => (setShow(true))}>Show Component</button>
            { show && <HeavyComponent />  }
        </div>
    );
}