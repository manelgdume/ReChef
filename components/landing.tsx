"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image";
 
import Header from "./headerLanding";
 
const Home = () => {
 
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-foreground">
        <div id="hero" className="grid max-w-screen-xl mx-auto items-center justify-items-center px-8 text-white py-8">
          <h1 className="text-4xl font-bold mt-16">Revolutionize Your Cooking with AI-Powered Recipes!</h1>
          <h2 className="mt-4 text-md text-background">Create personalized recipes in seconds, tailored to your tastes and dietary needs.</h2>
          <div className="flex mt-4 items-center">
            <input className="flex bg-foreground rounded-md border-strongForeground border p-2 mr-4 w-80 placeholder:text-white focus:outline-none" type="text" name="" id="" placeholder="Enter your email for updates" />
            <button className="items-center py-2 px-4 font-bold bg-primary rounded-lg text-black text-md"><span>Get Started Now</span></button>
          </div>
          <div className="my-8" style={{ position: "relative", width: "90%", height: "500px" }}>
            <Image
              src={"/landing/kitchen.jpg"}
              alt="Descripción de la imagen"
              fill
              style={{ objectFit: "cover", borderRadius: "0.5rem", borderColor: "black", borderWidth: "2px" }}
            />
          </div>
        </div>
      </div>
      <div id="sections " className="bg-white">
        <div id="section" className="flex items-center justify-items-center px-16 py-16 max-w-screen-xl mx-auto" >
          <div className="mr-16" style={{ position: "relative", width: "100%", height: "500px" }}>
            <Image
              src={"/landing/cooking.jpg"}
              alt="Descripción de la imagen"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="grid">
            <h3 className=" text-2xl font-bold justify-center">Transform Your Cooking with AI-Powered Recipes!</h3>
            <p className="mt-4 text-sm">Discover a world of culinary creativity at your fingertips. Our AI technology crafts personalized recipes tailored to your tastes and dietary needs, making cooking fun and effortless.</p>
            <button className="mt-8 items-center p-2 font-bold bg-primary rounded-lg text-black text-sm w-64"><span>Get Started Now</span></button>
            <p className="text-sm mt-4">Read Our Privacy Policy Here</p>
          </div>
        </div>
        <div id="section" className="items-center justify-items-center px-16 py-16 max-w-screen-xl mx-auto" >
          <h3 className=" text-2xl font-bold justify-center">Unlock Flavorful Creations with AI</h3>
          <div>
            <button className="mt-8 items-center p-2 font-bold bg-primary  rounded-lg text-black text-sm w-64"><span>Start Your Culinary Journey</span></button>
            <button className="mt-8 ml-4 items-center p-2 font-bold bg-white  border border-grey-600 rounded-lg text-black text-sm w-64"><span>Discover More Features</span></button>
          </div>
          <div>
            <div className="mt-16 grid grid-cols-2 gap-8">
              <div className="flex">
                <div className="flex rounded-md border border-gray-300 w-8 h-8 items-center justify-center">
                  <Image
                    src={"/landing/icons/lighting.png"}
                    alt="Stars"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="ml-4 text-sm">
                  <p className="font-bold">Personalized Recipes</p>
                  <p>Craft unique recipes tailored to your taste preferences and dietary needs.</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex rounded-md border border-gray-300 w-8 h-8 items-center justify-center">
                  <Image
                    src={"/landing/icons/lock.png"}
                    alt="Stars"
                    width={15}
                    height={20}
                  />
                </div>
                <div className="ml-4 text-sm">
                  <p className="font-bold">Ingredient Suggestions</p>
                  <p>Receive suggestions for substitutions and pairings to make the most of what you have.</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex rounded-md border border-gray-300 w-8 h-8 items-center justify-center">
                  <Image
                    src={"/landing/icons/stars.png"}
                    alt="Stars"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="ml-4 text-sm">
                  <p className="font-bold">Instant Meal Ideas</p>
                  <p>Generate meal ideas in seconds, perfect for busy lifestyles or spontaneous cooking.</p>
                </div>
              </div>
              <div className="flex">
                <div className="flex rounded-md border border-gray-300 w-8 h-8 items-center justify-center">
                  <Image
                    src={"/landing/icons/heart.png"}
                    alt="Stars"
                    width={15}
                    height={20}
                  />
                </div>
                <div className="ml-4 text-sm">
                  <p className="font-bold">Nutritional Insights</p>
                  <p>Get detailed nutritional information to help you make healthier choices.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div id="faq" className="grid items-center justify-items-center px-16 py-16 max-w-screen-xl mx-auto">
          <h3 className="text-2xl font-bold mt-4">Frequently Asked Questions</h3>
          <p className="text-sm font-semibold mt-4">Your Questions Answered</p>
          <Accordion type="single" collapsible className="w-full px-4 mt-16">
            <AccordionItem value="item-1" className="border border-grey-600 rounded-md px-4 bg-greyWhite mb-4">
              <AccordionTrigger>Is the service free to use?</AccordionTrigger>
              <AccordionContent>
                We offer a free limited plan for the moment. The free plan includes all features but with restricted usage.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border border-grey-600 rounded-md px-4 bg-greyWhite mb-4">
              <AccordionTrigger>Can I customize recipes based on my dietary preferences?</AccordionTrigger>
              <AccordionContent>
                Yes, our AI allows you to tailor recipes to your specific dietary needs, whether you are vegan, gluten-free, keto, or have other preferences.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border border-grey-600 rounded-md px-4 bg-greyWhite mb-4">
              <AccordionTrigger>How accurate are the nutritional insights provided?</AccordionTrigger>
              <AccordionContent>
                The nutritional information is calculated based on standard ingredient data. While highly accurate, it"s always a good idea to cross-check with a nutritionist for personalized advice.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border border-grey-600 rounded-md px-4 bg-greyWhite mb-4">
              <AccordionTrigger>Is my data secure?</AccordionTrigger>
              <AccordionContent>
                Yes, we take your privacy and data security seriously. We adhere to strict security protocols and are fully compliant with GDPR and other relevant regulations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="max-w-screen-xl mx-auto px-16 pt-16">
          <div className="  border-t border-grey-600"></div>
        </div>
        <div id="footer" className="grid grid-cols-4 items-center justify-items-start px-16 pt-8 pb-16 max-w-screen-xl mx-auto">
          <div className="grid mt-0 pt-0 gap-2">
            <h4 className="font-semibold text-slate-600 ">Explore</h4>
            <p className="font-medium">Features</p>
            <p className="font-medium">How it Works</p>
            <p className="font-medium">Pricing</p>
            <p className="font-medium">Recipes</p>
            <p className="font-medium">Blog</p>
          </div>
          <div className="grid mt-0 pt-0 gap-2">
            <h4 className="font-semibold text-slate-600 ">Support</h4>
            <p className="font-medium">Help Center</p>
            <p className="font-medium">FAQs</p>
            <p className="font-medium">Privacy Policy</p>
            <p className="font-medium">Terms of Service</p>
            <p className="font-medium">Contact Us</p>
          </div>
          <div className="grid mt-0 pt-0 gap-2">
            <h4 className="font-semibold text-slate-600 ">Company</h4>
            <p className="font-medium">About Us</p>
            <p className="font-medium">Careers</p>
            <p className="font-medium">Press</p>
            <p className="font-medium">Affiliates</p>
            <p className="font-medium">Sustainability</p>
          </div>
          <div className="grid mt-0 pt-0 gap-2">
            <h4 className="font-semibold text-slate-600 ">Stay Connected</h4>
            <p className="font-medium">Newsletter</p>
            <p className="font-medium">Follow us on Twitter</p>
            <p className="font-medium">Follow us on Instagram</p>
            <p className="font-medium">Follow us on Facebook</p>
            <p className="font-medium">LinkedIn</p>
          </div>
          <div className="grid mt-8 col-span-full">
            <div className="flex items-center">
              <Image
                src={"/logoipsum-265.svg"}
                alt="Descripción de la imagen"
                width={40}
                height={40}
              />
              <h1 className="ml-4 text-xl font-bold">ReChef</h1>
            </div>
            <p className="mt-4">© 2023 AI Recipe Creator. All Rights Reserved.</p>
           </div>
        </div>


      </div>

    </div>

  );
};

export default Home;
