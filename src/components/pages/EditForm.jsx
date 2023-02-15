
const EditForm = () => {
    return ( 
        <div>
            <form onSubmit={handleEdit} />
                <input 
                    type="text"
                    id="nickname"
                    placeholder='nickname...'
                    value={form.nickname} 
                    onChange={e => setForm({...form, nickname: e.target.value})}
                />
        </div>
     );
}
 
export default EditForm;

// have a useState for for,setForm
// initial state going to be the prop for that fit