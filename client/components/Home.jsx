export default function Home (){
    return (
        <main>
            <nav style={{
                display:'flex',
                justifyContent:'flex-end',
                padding:'5px 10px'
            }}>
                <a href="/register" style={{
                    border:'1px solid violet',
                    padding:'10px 10px'
                }}>Register</a>
            </nav>
        </main>
    );
}