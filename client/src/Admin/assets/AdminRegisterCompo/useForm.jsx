import { useEffect, useState } from 'react'
import { useAuth } from '../../../pages/Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const useForm = () => {
    const [inputs, setInputs] = useState({
        firstname: "",
        lastname: "",
        email: "",
        gender: "",
        mobile: "",
        zip_code: "",
        street: "",
        password: "",
        password2: "",
        country: "",
        city: "",
        countryCode: "",
        state: "",
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState({});
    const { isLoggedIn } = useAuth();
    const history = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            history('/admin/dashboard')
        }

    }, [isLoggedIn, history])

    // const handleChange = (e, value) => {
    //     const { name, value: targetValue } = e.target || {}; // Destructure event object
    //     const newValue = value !== undefined ? value : targetValue; // Use value from event or direct value
    //     setInputs({
    //         ...inputs,
    //         [name]: newValue
    //     });

    //     // setInputs({
    //     //     ...inputs,
    //     //     [e.target.name]: e.target.value
    //     // })
    //     console.log("inputs handleChange: ", inputs)

    // }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
        console.log("inputs handleChange: ", inputs)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("inputs handleSubmit: ", inputs)

        try {
            const { password, password2, ...formData } = inputs;
            if (password !== password2) {
                setErrors('Password Does not Match');
                // console.log('Password Does not Match');
                // setSuccess('');
                return;
            }

            // const body = { firstname, lastname, email, mobile, zip_code, address, password, country, countryCode, state }
            const response = await fetch(`https://netflix-clone-q429.onrender.com/auth/createAdminNewAccount`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputs),

            });
            const parseRes = await response.json();
            if (parseRes.message === 'Account Create successfully') {
                setSuccess(parseRes.message);
                setErrors('');
                const { user_id } = parseRes.user_id;
                localStorage.setItem('userId', user_id);
                setTimeout(() => {
                    history('/admin/login');
                }, 2000);
            } else {
                setErrors('email allready exits');
                setSuccess('');
            }

        } catch (err) {
            console.error(err.message);
            setErrors('An error occurred while creating the account.');
            setSuccess('');
        }
    }
    return { handleChange, inputs, handleSubmit, errors, success }
}

export default useForm
