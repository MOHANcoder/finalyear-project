import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';

export default function CourseEditor(){

    const actions = {
        bold:'font-weight:bold'
    };
    
    const ActionButton = ({style,icon}) =>{
        return (
            <button style={style}>
                {icon}
            </button>
        );
    }

    return (
        <main style={{
            backgroundColor:'lightgray',
            width:'100%',
            minHeight:'100dvh'
        }}>
            <section style={{
                width:'100%',
                height:'20dvh',
                position:'fixed',
                boxSizing:'border-box',
                borderBottom:'1px solid',
                zIndex:1
            }}>
                <section
                    style={{
                        height:'80%',
                        boxSizing:'border-box',
                        borderBottom:'1px solid red',
                        display:'flex'
                    }}
                >
                    {/* Font - section */}
                    <div 
                    style={{
                        width:'25%',
                        border:'1px solid',
                        display:'grid',
                        gridTemplateAreas:`
                            'fontTab fontTab fontTab fontTab fontSize fontSize'
                            'fontTab fontTab fontTab fontTab fontSize fontSize'
                            'bold bold italic italic textDecoration textDecoration'
                            'bold bold italic italic textDecoration textDecoration'
                            '. . . . . .'
                            '. . . . . .'
                            '. . . . . .'
                            '. . . . . .'
                        `
                    }}>
                        <div style={{
                            gridArea:'fontTab'
                        }}>
                            <select id="fontTab" style={{width:'100%',height:'100%'}}>
                                <option value="monospace">Monospace</option>
                            </select>
                        </div>
                        <div style={{
                            gridArea:'fontSize'
                        }}>
                            <select name="fontSize" id="fontSize" style={{width:'100%',height:'100%'}} >
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="14">14</option>
                                <option value="16">16</option>
                                <option value="18">18</option>
                                <option value="20">20</option>
                                <option value="22">22</option>
                                <option value="24">24</option>
                                <option value="26">26</option>
                                <option value="28">28</option>
                            </select>
                        </div>
                        <ActionButton style={{gridArea:'bold'}} icon={<FormatBoldIcon/>}/>
                        <ActionButton style={{gridArea:'italic'}} icon={<FormatItalicIcon/>}/>
                        <div style={{
                            gridArea:'textDecoration'
                        }}>
                            <select name="textDecoration" id="textDecoration" style={{width:'100%',height:'100%'}}>
                                <option value="underline">Underline</option>
                                <option value="wave">Wave</option>
                            </select>
                        </div>
                    </div>
                </section>
            </section>
            <section style={{
                height:'80dvh',
                position:'relative',
                top:'20vh'
            }}>
                        <article contentEditable='true' style={{
                            backgroundColor:'white',
                            margin:'auto',
                            width:'70%',
                            minHeight:'100%',
                            boxSizing:'border-box',
                            padding:'10px 50px'
                        }}>
                        </article>
            </section>
        </main>
    );
}