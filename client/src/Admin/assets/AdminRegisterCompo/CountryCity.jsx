import React, { useState } from 'react'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector'

const CountryCity = ({ handleChange, inputs }) => {
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    // const { handleChange, inputs, handleSubmit, errors } = useForm();

    const handleCountryChange = (val) => {
        handleChange({ target: { name: 'country', value: val } });
        // handleChange({ target: { name: 'country' } }, val);
        setCountry(val);
    };

    const handleRegionChange = (val) => {
        handleChange({ target: { name: 'state', value: val } });
        // handleChange({ target: { name: 'region' } }, val);
        setState(val);
    };

    console.log('country, state :', country, state)

    return (
        <div className='forms'>
            <CountryDropdown
                value={country || inputs.country}
                onChange={handleCountryChange}
                // onBlur={(e) => e.preventDefault()}
                // defaultOptionLabel={'Country *'}
                // style={{
                //     padding: 15,
                //     width: '33.33%',
                //     marginTop: '2%',
                //     // marginLeft: 15,
                //     borderWidth: 2,
                //     borderStyle: "solid",
                //     borderColor: "gray",
                //     fontFamily: "Roboto",
                //     fontWeight: "bold",
                //     fontSize: 16,
                //     color: "gray",
                //     marginBottom: '1%'
                // }}
            />
            <RegionDropdown
                blankOptionLabel={'State'}
                country={country}
                value={state || inputs.state}
                onChange={handleRegionChange}
                // onBlur={(e) => e.preventDefault()}
                // style={{
                //     padding: 15,
                //     width: '33.33%',
                //     marginTop: '2%',
                //     marginLeft: '2%',
                //     borderWidth: 2,
                //     borderStyle: "solid",
                //     borderColor: "gray",
                //     fontFamily: "Roboto",
                //     fontWeight: "bold",
                //     fontSize: 16,
                //     color: "gray",
                //     marginBottom: '1%'
                // }}
            />
        </div>
    )
}

export default CountryCity
