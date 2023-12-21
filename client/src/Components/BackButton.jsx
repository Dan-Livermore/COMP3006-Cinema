import { useNavigate } from 'react-router-dom';

const BackButton = () => { 
    let navigate = useNavigate();
    return (
        <>
          <button className='bg-sky-600 rounded-lg text-white h-10 w-40' onClick={() => navigate(-1)}>Return to List</button>
        </>
    );
};

export default BackButton;