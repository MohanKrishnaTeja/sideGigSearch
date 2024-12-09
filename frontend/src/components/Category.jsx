import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

const cat = ["a", "b", "c", "d", "e"];

export default function Category() {
  return (
    <div>
      <Carousel className = "w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {cat.map((cate, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
              <Button variant="outline" className="rounded-full">{cate}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  );
}
