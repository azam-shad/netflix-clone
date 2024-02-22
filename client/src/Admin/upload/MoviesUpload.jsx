import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Input, FormLabel, Select, MenuItem, FormControl, Chip } from '@mui/material';
import { Alert, Button } from 'react-bootstrap';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));


const MoviesUpload = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [category, setCategory] = useState([]);
    const [genres, setGenres] = useState('')
    const [categoryDetail, setCategoryDetail] = useState([])
    const [genresDetail, setGenresDetail] = useState([])
    const [genresID, setGenresID] = useState('');
    const [categoryID, setCategoryID] = useState([]);



    useEffect(() => {

        const fetchDetail = async () => {
            const responce = await fetch(`http://localhost:5000/adminData/category_genres`);
            const data = await responce.json();
            setCategoryDetail(data.detailsCategory)
            setGenresDetail(data.detailsGenres)
        }
        fetchDetail();

    }, []);


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
    const handelGenresChange = (event) => {
        const selectedGenres = event.target.value;
        setGenres(selectedGenres);
        const selectedGenreObject = genresDetail.find(genre => genre.name === selectedGenres);
        setGenresID(selectedGenreObject.genre_id);


    }
    console.log('data.categoryID: ', categoryID);
    console.log('data.genre_id: ', genresID);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.target);

            // Get other form fields
            const title = formData.get('title');
            const description = formData.get('description');
            const releaseDate = formData.get('release_date');
            const duration = formData.get('duration');
            const director = formData.get('director');

            // Prepare data to send
            const data = {
                title,
                description,
                release_date: releaseDate,
                duration,
                director,
            };

            const responce = await fetch(`http://localhost:5000/adminUpload/moviesUpload`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (responce.ok) {
                const responseData = await responce.json();
                const movieId = responseData.movieId;
                console.log('movieId: ', movieId);
                localStorage.setItem('movieId', movieId)

                const posterFile = formData.get('poster_url');
                const trailerFile = formData.get('trailer_url');
                const videoFile = formData.get('video_url');

                // Create a new FormData instance for files
                const fileFormData = new FormData();
                fileFormData.append('poster_url', posterFile);
                fileFormData.append('trailer_url', trailerFile);
                fileFormData.append('video_url', videoFile);
                fileFormData.append('movieId', movieId);
                fileFormData.append('categoryID', categoryID);
                fileFormData.append('genresID', genresID);

                const fileResponse = await fetch(`http://localhost:5000/adminUpload/uploadMovie`, {
                    method: 'POST',
                    mode: 'cors',
                    body: fileFormData,
                });
                if (fileResponse.ok) {
                    console.log('Files uploaded successfully');
                    setAlertMessage('Upload Successfully')
                    setTimeout(() => {
                        setAlertMessage('');
                    }, 2000);
                    event.target.reset();
                    setCategory([]);
                    setGenres('');
                } else {
                    console.error('Failed to upload files');
                    setAlertMessage('Not Upload Successfully')
                    setTimeout(() => {
                        setAlertMessage('');
                    }, 2000);
                }
            } else {
                console.error('Failed to send movie data');
            }


        } catch (error) {
            console.error('Error sending form data:', error);
        }
    }

    return (
        <div className='datatable mt-5' >
            {alertMessage && <Alert variant='danger' className='alertMessage' >{alertMessage}</Alert>}
            <Box sx={{ flexGrow: 1 }}>
                <form onSubmit={handleSubmit} encType="multipart/form-data" action="">
                    <Grid container spacing={2}>
                        <Grid xs={4}>
                            <Item>
                                <FormLabel htmlFor='title' style={{ width: '40%', border: 'none' }}>Movies Title</FormLabel>
                                <Input type="text" style={{ width: '100%', border: 'none' }} placeholder='Movies Title' id='title' name='title' />
                            </Item>
                        </Grid>
                        <Grid xs={4}>
                            <Item>
                                <FormLabel htmlFor='description' style={{ width: '40%', border: 'none' }}>Description</FormLabel>
                                <Input type="text" style={{ width: '100%', border: 'none' }} placeholder='Movies description' name='description' id='description' />
                            </Item>
                        </Grid>
                        <Grid xs={4}>
                            <Item>
                                <FormLabel htmlFor='release_date' style={{ width: '40%', border: 'none' }}>Release Date</FormLabel>
                                <Input type="date" style={{ width: '100%', border: 'none' }} name='release_date' id='release_date' />
                            </Item>
                        </Grid>
                        <Grid xs={4}>
                            <Item>
                                <FormLabel htmlFor='duration' style={{ width: '40%', border: 'none' }}>Duration</FormLabel>
                                <Input type="text" style={{ width: '100%', border: 'none' }} name='duration' placeholder='Movies duration (hh:mm:ss)' id='duration' />
                            </Item>
                        </Grid>

                        <Grid xs={4}>
                            <Item>
                                <FormLabel htmlFor='director' style={{ width: '40%', border: 'none' }}>Director Name</FormLabel>
                                <Input type="text" style={{ width: '100%', border: 'none' }} name='director' placeholder='director name' id='director' />
                            </Item>
                        </Grid>
                        <Grid xs={4}>
                            <Item>
                                <FormLabel id='category' htmlFor='category' style={{ width: '40%', border: 'none' }}>Category</FormLabel>
                                <FormControl variant="standard" sx={{ m: 1, width: '100%', textAlign: 'left' }}>
                                    <Select
                                        labelId="category"
                                        id="category"
                                        multiple
                                        value={category}
                                        onChange={handelCategoryChange}
                                        renderValue={(category) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {category.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                                {category.length === 0 && <span>Select an Category</span>}
                                            </Box>
                                        )}
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>
                                            <em>Select an Category</em>
                                        </MenuItem>
                                        {categoryDetail.map((data) => (
                                            <MenuItem key={data.category_id} value={data.category_name}>{data.category_name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Item>
                        </Grid>
                        <Grid xs={4}>
                            <Item>
                                <FormLabel htmlFor='genres' style={{ width: '40%', border: 'none' }}>Genres</FormLabel>
                                <FormControl variant="standard" sx={{ m: 1, width: '100%', textAlign: 'left', textTransform: 'capitalize' }}>
                                    <Select
                                        labelId="genres"
                                        id="genres"
                                        value={genres}
                                        onChange={handelGenresChange}
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>
                                            <em>Select an Genres</em>
                                        </MenuItem>
                                        {genresDetail.map((data) => (
                                            <MenuItem key={data.genre_id} value={data.name} style={{ textTransform: 'capitalize' }}>{data.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Item>
                        </Grid>

                        <Grid xs={4}>
                            <Item>
                                <FormLabel htmlFor='poster_url' style={{ width: '40%', border: 'none' }}>Image</FormLabel>
                                <Input type="file" style={{ width: '100%', border: 'none' }} name='poster_url' placeholder='poster' id='poster_url' />
                            </Item>
                        </Grid>
                        <Grid xs={4}>
                            <Item>
                                <FormLabel htmlFor='trailer_url' style={{ width: '40%', border: 'none' }}>Trailer Video</FormLabel><Input type="file" style={{ width: '100%', border: 'none' }} name='trailer_url' placeholder='trailer' id='trailer_url' />
                            </Item>
                        </Grid>
                        <Grid xs={4}>
                            <Item>
                                <FormLabel htmlFor='video_url' style={{ width: '40%', border: 'none' }}>Movies</FormLabel>
                                <Input type="file" style={{ width: '100%', border: 'none' }} name='video_url' placeholder='video' id='video_url' />
                            </Item>
                        </Grid>
                        <Grid xs={12}>
                            <Button type='submit' variant='primary'>Submit</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>

        </div>
    )
}

export default MoviesUpload
