import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import {RiPhoneFill, RiPhoneLine, 
        RiContactsFill, RiContactsLine} from 'react-icons/ri'
import {IoKeypad,IoKeypadOutline} from 'react-icons/io5'
import {AiFillSetting, AiOutlineSetting}  from 'react-icons/ai'
import './css/bottomNav.css'


const BottomNav = () =>{
    const history = useHistory()
    const [activeTabs, setActiveTabs] = useState('')

    useEffect(()=>{
        switch(activeTabs){
            case 'activities':
                history.push('/activities')
                break;
            case 'contacts':
                history.push('/')
                break;
            case 'keypad':
                history.push('/')
                break;
            case 'setting':
                history.push('/')
                break;
            default:
                history.push('/')
                break;
        }
    },[activeTabs,history])

    return(
        <div className="bottom-nav">
            <div className="button-tab">
                {activeTabs === ('activities')?
                    <RiPhoneFill
                        size='35'
                        color='#A09E9E'
                        onClick={()=>setActiveTabs('activities')}
                    /> :
                    <RiPhoneLine
                        size='35'
                        color='#A09E9E'
                        onClick={()=>setActiveTabs('activities')}
                    />}
            </div>
            <div className="button-tab">
                {activeTabs === ('contacts')?
                    <RiContactsFill
                        size='35'
                        color='#A09E9E'
                        onClick={()=>setActiveTabs('contacts')}
                    /> :
                    <RiContactsLine
                        size='35'
                        color='#A09E9E'
                        onClick={()=>setActiveTabs('contacts')}
                    />}
            </div>
            <div className="button-tab">
                {activeTabs === ('keypad')?
                    <IoKeypad
                        size='35'
                        color='#A09E9E'
                        onClick={()=>setActiveTabs('keypad')}
                    /> :
                    <IoKeypadOutline
                        size='35'
                        color='#A09E9E'
                        onClick={()=>setActiveTabs('keypad')}
                    />}
            </div>
            <div className="button-tab">
                {activeTabs === ('setting')?
                    <AiFillSetting
                        size='35'
                        color='#A09E9E'
                        onClick={()=>setActiveTabs('setting')}
                    /> :
                    <AiOutlineSetting
                        size='35'
                        color='#A09E9E'
                        onClick={()=>setActiveTabs('setting')}
                    />}
            </div>
        </div>
    )
}

export default BottomNav;
