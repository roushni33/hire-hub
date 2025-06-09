import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/Carousel';
import { Button } from './ui/Button';
import { setSearchQuery } from '../redux/jobSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Data Scientist",
    "UI/UX Designer",
    "Graphic Designer",
    "Data Analyst",

]
const CategoryCarousel = (query) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = () => {
            dispatch(setSearchQuery(query));
            navigate("/browse");
        }
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">


                            <Button onClick={() => searchJobHandler(cat)} variant="outline" className='rounded-full '>{cat}</Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
