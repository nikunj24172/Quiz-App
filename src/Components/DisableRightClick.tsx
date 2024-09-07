import React, { useEffect } from 'react'

const DisableRightClick: React.FC = () => {
 useEffect(()=>{
    const handleContext = (e:MouseEvent)=>{
        e.preventDefault();
    }

    document.addEventListener('contextmenu', handleContext);

    return ()=>{
        document.removeEventListener('contextmenu', handleContext);
    }
 },[]);

 return null;
}

export default DisableRightClick;


/* Note : This is Additional Feature to increase security of app because user go on network page and right click he can see correct answer it not good for security  purpose please consider this as security feature & if you want to check api call you can remove this component form App.tsx file...
*/