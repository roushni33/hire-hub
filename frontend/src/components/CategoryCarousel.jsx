import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from './ui/Carousel';
import { Button } from './ui/Button';

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
const CategoryCarousel = () => {
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            
                            
                          <Button>{cat}</Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
