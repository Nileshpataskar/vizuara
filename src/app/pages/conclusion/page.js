import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="bg-[#f2f0f0] flex  min-h-screen px-72 flex-col space-y-8">
      <h1 className="text-2xl font-bold mt-10 text-center">Conclusion</h1>

      <p className="text-lg">
        Wow, what a whirlwind adventure we had with Digi Yatra! This awesome app
        taught us all about the magic of AI, from making our boarding passes to
        recognizing our faces at the airport. Let's relive our journey and see
        what amazing things we discovered!
      </p>
      <h1 className="text-xl font-bold ">Our Incredible Journey:</h1>

      <p className="text-lg">
        When we used Digi Yatra, we felt like we had a real-life wizard helping
        us out. First, AI worked its magic to create our boarding passes for the
        big trip. It was like having a super speedy assistant who knew just what
        we needed!
      </p>

      <p className="text-lg">
        {" "}
        Then, when we arrived at the airport, we stepped up to a
        mysterious-looking machine with a camera. We were a little nervous at
        first, but when we stood in front of it, something amazing happened. The
        machine recognized our faces, just like that! It was like having a
        friend who could spot us in a crowded room.
      </p>
      <p className="text-lg">
        And not only did it recognize us, but it also showed our names on the
        screen! It felt like we were in a magical storybook, where everything
        knows who we are.
      </p>

      <h1 className="text-xl font-bold mt-10">What We Learned:</h1>
      <p className="text-lg">
        Through our adventure, we realized that AI isn't just some fancy
        technology. It's like having a wise friend who can do all sorts of
        incredible things, like making sure we have our boarding passes ready
        and helping us breeze through airport security.
      </p>
      <p className="text-lg">
        We also learned that AI isn't perfect. Sometimes, it might get a little
        mixed up or not recognize us right away. But that's okay! We can help
        teach it and make it even better, just like helping a friend learn
        something new.
      </p>
      <h1 className="text-xl font-bold mt-10">Dreaming of More Adventures:</h1>

      <p className="text-lg">
        As we head home from our journey, we can't help but dream of more
        adventures with AI by our side. With its help, we can explore new
        places, discover new things, and make memories that will last a
        lifetime. Who knows what magical adventures await us next time!
      </p>

      <div className="flex justify-center">
        <Button
          variant="contained"
          className="w-24 rounded-xl font-bold bg-gradient-to-r from-[#df63a5] to-[#d56339] text-white "
        >
          <Link href="/pages/self-checkin">Previous</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;