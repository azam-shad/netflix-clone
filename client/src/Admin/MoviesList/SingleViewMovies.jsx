import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Alert, Button, Card } from 'react-bootstrap';
import { Box, Chip, FormControl, Grid, MenuItem, Select } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';


const SingleViewMovies = () => {
    const { movieId } = useParams();
    const [movieData, setMovieData] = useState(null)
    const [clickedInput, setClickedInput] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [categoryID, setCategoryID] = useState([]);
    const [category, setCategory] = useState([]);
    const [genres, setGenres] = useState('')
    const [genresDetail, setGenresDetail] = useState([])
    const [genresID, setGenresID] = useState('');
    const [categoryDetail, setCategoryDetail] = useState([])
    const formRef = useRef();
    const [messages, setMessage] = useState('');

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await fetch(`https://netflix-clone-q429.onrender.com/adminData/moviesDetail/${movieId}`);
                const data = await response.json();
                setMovieData(data.adminMoviesList);
                console.log('data.adminMoviesList: ', data.adminMoviesList)

            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };

        const fetchMoviesCategoryDetail = async () => {
            const responce = await fetch(`https://netflix-clone-q429.onrender.com/adminData/category_genres`);
            const data = await responce.json();
            setCategoryDetail(data.detailsCategory)
            setGenresDetail(data.detailsGenres)
        }
        fetchMoviesCategoryDetail();

        fetchMovieData();
    }, [movieId]);

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (formRef.current && !formRef.current.contains(event.target)) {
    //             setClickedInput(null);
    //         }
    //     };
    //     document.addEventListener('click', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('click', handleClickOutside);
    //     };
    // }, []);

    const handleInputClick = (inputId) => {
        setClickedInput((prevInput) => (prevInput === inputId ? null : inputId));
        setEditMode(true);
    };
    const handelGenresChange = (event) => {
        const selectedGenres = event.target.value;
        setGenres(selectedGenres);
        const selectedGenreObject = genresDetail.find(genre => genre.name === selectedGenres);
        setGenresID(selectedGenreObject.genre_id);
    }

    const handelCategoryChange = (event) => {
        const {
            target: { value },
        } = event;
        const selectedCategory = typeof value === 'string' ? value.split(',') : value;
        console.log('selectedCategory: ', selectedCategory)
        setCategory(selectedCategory);
        const selectedCategoryIDs = selectedCategory.map(categoryName => {
            const selectedCategoryObject = categoryDetail.find(category => category.category_name === categoryName);
            return selectedCategoryObject.category_id;
        });
        setCategoryID(selectedCategoryIDs);
    }

    const handelUpdate = async (event) => {
        event.preventDefault();
        try {
            const body = { movieId, categoryID, genresID }
            const responce = await fetch(`https://netflix-clone-q429.onrender.com/adminUpload/updateCatGen`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (responce.ok) {
                setMessage('Upload Successfully')
                setTimeout(() => {
                    setMessage('');
                }, 2000);
            } else {
                console.error('Failed to upload files');
                setMessage('Not Upload Successfully')
                setTimeout(() => {
                    setMessage('');
                }, 2000);
            }

        } catch (error) {
            console.error('Error sending form data:', error);
        }
    }
    const deleteCategory = async (event) => {
        event.preventDefault();
        try {
            const body = { movieId }
            const responce = await fetch(`https://netflix-clone-q429.onrender.com/adminUpload/deleteCatGen`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (responce.ok) {
                setMessage('Delete Successfully Category')
                setTimeout(() => {
                    setMessage('');
                }, 2000);
            } else {
                console.error('Failed to upload files');
                setMessage('Not Delete Category')
                setTimeout(() => {
                    setMessage('');
                }, 2000);
            }

        } catch (error) {
            console.error('Error sending form data:', error);
        }
    }

    return (
        <div className="datatable">
            {messages && <Alert variant='danger' className='alertMessage mt-5' >{messages}</Alert>}
            {movieData ? (
                <>
                    <div className='container-xxl profileMain mt-5' ref={formRef}>
                        <div className="detailsCard">
                            <Card className='mb-lg-4'>
                                <Card.Header as="h5">Movie Details</Card.Header>
                                <Card.Body>
                                    <div className='imageLeft mb-5'>
                                        <div className='iconStyle d-inline-block'>
                                            <FontAwesomeIcon icon={faFilm} beatFade style={{ height: '30px', width: '30px' }} className='mt-2 ms-2  text-center align-content-center' />
                                        </div>

                                        <h4>{movieData.title}</h4>

                                    </div>
                                    <Card.Text>
                                        <Form className='nameForm'>
                                            <Form.Group className="mb-3 firstNmae" controlId="formBasicCountry">
                                                <Form.Label className='mt-2'>Movie Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    style={{
                                                        borderBottom: clickedInput === 'moviename' ? '2px solid #007BFF' : '2px solid #000',
                                                        backgroundColor: '#F5F5F5',
                                                        color: '#000',
                                                        borderTop: 'none',
                                                        borderLeft: 'none',
                                                        borderRight: 'none',
                                                        borderRadius: '0',
                                                        transition: 'none'
                                                    }}
                                                    value={movieData.title || ''}
                                                    className='disableHover'
                                                />
                                            </Form.Group>
                                            {/* <Form className='nameForm'> */}
                                            <Form.Group className="mb-3 lastName" controlId="formBasicDuration">
                                                <Form.Label className='mt-2'>Duration</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    style={{
                                                        borderBottom: clickedInput === 'duration' ? '2px solid #007BFF' : '2px solid #000',
                                                        backgroundColor: '#F5F5F5',
                                                        color: '#000',
                                                        borderTop: 'none',
                                                        borderLeft: 'none',
                                                        borderRight: 'none',
                                                        borderRadius: '0',
                                                        transition: 'none'
                                                    }}
                                                    value={movieData.duration || ''}
                                                    className='disableHover'
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3 lastName" controlId="formBasicGenres">
                                                <Form.Label className='mt-2'>Genres</Form.Label>
                                                <FormControl variant="standard" sx={{ width: '100%', textAlign: 'left', textTransform: 'capitalize' }}>
                                                    {/* <Form.Control
                                                        type="text"
                                                        style={{
                                                            borderBottom: clickedInput === 'country' ? '2px solid #007BFF' : '2px solid #000',
                                                            backgroundColor: '#F5F5F5',
                                                            color: '#000',
                                                            borderTop: 'none',
                                                            borderLeft: 'none',
                                                            borderRight: 'none',
                                                            borderRadius: '0',
                                                            transition: 'none'
                                                        }}
                                                        value={movieData.name || ''}
                                                        className='disableHover'
                                                    /> */}
                                                    <Select
                                                        labelId="genres"
                                                        id="genres"
                                                        value={genres}
                                                        style={{
                                                            borderBottom: clickedInput === 'genres' ? '2px solid #007BFF' : '2px solid #000',
                                                            backgroundColor: '#F5F5F5',
                                                            color: '#000',
                                                            borderTop: 'none',
                                                            borderLeft: 'none',
                                                            borderRight: 'none',
                                                            borderRadius: '0',
                                                            transition: 'none'
                                                        }}
                                                        onChange={handelGenresChange}
                                                        displayEmpty
                                                    >
                                                        <MenuItem value={''} disabled>
                                                            <em>{movieData.name}</em>
                                                        </MenuItem>
                                                        {genresDetail.map((data) => (
                                                            <MenuItem key={data.genre_id} value={data.name} style={{ textTransform: 'capitalize' }}>{data.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Form.Group>
                                        </Form>
                                        <Form className='nameForm'>
                                            <Form.Group className="mb-3 lastName" controlId="formBasicDirector">
                                                <Form.Label className='mt-2'>Director</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    style={{
                                                        borderBottom: clickedInput === 'director' ? '2px solid #007BFF' : '2px solid #000',
                                                        backgroundColor: '#F5F5F5',
                                                        color: '#000',
                                                        borderTop: 'none',
                                                        borderLeft: 'none',
                                                        borderRight: 'none',
                                                        borderRadius: '0',
                                                        transition: 'none'
                                                    }}
                                                    value={movieData.director || ''}
                                                    className='disableHover'
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3 lastName" controlId="formBasicCategory">
                                                <Form.Label className='mt-2'>Category</Form.Label>

                                                <FormControl variant="standard" sx={{ width: '100%', textAlign: 'left' }}>
                                                    {/* <Form.Control
                                                        type="text"
                                                        style={{
                                                            borderBottom: clickedInput === 'category' ? '2px solid #007BFF' : '2px solid #000',
                                                            backgroundColor: '#F5F5F5',
                                                            color: '#000',
                                                            borderTop: 'none',
                                                            borderLeft: 'none',
                                                            borderRight: 'none',
                                                            borderRadius: '0',
                                                            transition: 'none'
                                                        }}
                                                        value={movieData.category_name || ''}
                                                        className='disableHover'
                                                    /> */}
                                                    <Select
                                                        labelId="category"
                                                        id="category"
                                                        multiple
                                                        style={{
                                                            borderBottom: clickedInput === 'category' ? '2px solid #007BFF' : '2px solid #000',
                                                            backgroundColor: '#F5F5F5',
                                                            color: '#000',
                                                            borderTop: 'none',
                                                            borderLeft: 'none',
                                                            borderRight: 'none',
                                                            borderRadius: '0',
                                                            transition: 'none'
                                                        }}
                                                        value={category}
                                                        onClick={() => handleInputClick('category')}
                                                        onChange={handelCategoryChange}
                                                        renderValue={(category) => (
                                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                {category.map((value) => (
                                                                    <Chip key={value} label={value} />
                                                                ))}
                                                                {category.length === 0 && <span>{movieData.category_name}</span>}
                                                            </Box>
                                                        )}
                                                        displayEmpty
                                                    >
                                                        <MenuItem value={movieData.category_name} disabled>
                                                            <em>Select an Category</em>
                                                        </MenuItem>
                                                        {categoryDetail.map((data) => (
                                                            <MenuItem key={data.category_id} value={data.category_name}>{data.category_name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Form.Group>
                                            {movieData.category_name && (
                                                <Form.Group className="mb-3 lastName" controlId="formBasicCategory">
                                                    <Form.Label className='mt-2'>Delete Category</Form.Label>

                                                    <FormControl variant="standard" sx={{ width: '100%', textAlign: 'left' }}>

                                                        <Button variant="danger" onClick={deleteCategory}>Delete</Button>
                                                    </FormControl>
                                                </Form.Group>
                                            )}
                                        </Form>
                                    </Card.Text>
                                    <Button variant="primary" onClick={handelUpdate}>Update</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default SingleViewMovies
