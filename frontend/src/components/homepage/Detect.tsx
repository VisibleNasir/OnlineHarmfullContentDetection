import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ShinyButton } from "@/components/magicui/shiny-button";
import axios from "axios";

const Detect = () => {
  const [imageResult, setImageResult] = useState("");
  const [videoResult, setVideoResult] = useState("");
  const [text, setText] = useState("");
  const [textResult, setTextResult] = useState("");
  const [loadingText, setLoadingText] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);

  const handleTextDetect = async () => {
    setLoadingText(true);
    try {
      const response = await axios.post<{ result: string }>("http://localhost:3000/predict-text", {
        text,
      });
      setTextResult(response.data.result);
    } catch (error) {
      console.error("Error detecting text:", error);
      setTextResult("Error processing request.");
    } finally {
      setLoadingText(false);
    }
  };

  const handleImageDetect = () => {
    setLoadingImage(true);
    setTimeout(() => {
      setImageResult("Image is safe");
      setLoadingImage(false);
    }, 1500); // Mock API delay
  };

  const handleVideoDetect = () => {
    setLoadingVideo(true);
    setTimeout(() => {
      setVideoResult("No harmful content found in video");
      setLoadingVideo(false);
    }, 1500); // Mock API delay
  };

  return (
    <div className="flex flex-wrap justify-center gap-12 mt-8 px-4 w-full">
      {/* Text Detection */}
      <Card className="w-[350px] min-h-[500px] bg-zinc-900 border-zinc-800 text-white flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
        <div>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Text Detection</CardTitle>
            <CardDescription className="text-lg">Analyze any written content instantly.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="text" className="text-lg">Enter Text</Label>
              <Textarea
                id="text"
                rows={6}
                placeholder="Paste your content here..."
                className="bg-zinc-800 text-white h-42"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            {loadingText ? (
              <div className="relative">
                <Skeleton className="h-12 w-full bg-zinc-800 animate-pulse" aria-busy="true" />
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-400 text-lg font-medium">
                  Processing...
                </p>
              </div>
            ) : textResult ? (
              <div
                className={`font-medium border p-3 rounded-md text-lg ${
                  textResult.toLowerCase().includes("no harmful")
                    ? "text-green-400 bg-zinc-900"
                    : "text-red-400 bg-zinc-800"
                }`}
              >
                {textResult}
              </div>
            ) : null}
          </CardContent>
        </div>
        <CardFooter className="flex justify-end p-4">
          <ShinyButton className="px-6 py-2 text-xl" onClick={handleTextDetect}>
            Detect
          </ShinyButton>
        </CardFooter>
      </Card>

      {/* Image Detection */}
      <Card className="w-[350px] min-h-[500px] bg-zinc-900 border-zinc-800 text-white flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
        <div>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Image Detection</CardTitle>
            <CardDescription className="text-lg">
              Upload an image to detect harmful content.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="image" className="text-lg">Upload Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="bg-zinc-800 text-white h-30 file:text-black file:bg-purple-200 file:px-6 file:rounded-md"
              />
            </div>
            {loadingImage ? (
              <div className="relative">
                <Skeleton className="h-12 w-full bg-zinc-800 animate-pulse" aria-busy="true" />
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-400 text-lg font-medium">
                  Processing...
                </p>
              </div>
            ) : imageResult ? (
              <div className="text-green-400 font-medium border p-3 rounded-md bg-zinc-900 text-lg">
                {imageResult}
              </div>
            ) : null}
          </CardContent>
        </div>
        <CardFooter className="flex justify-end p-4">
          <ShinyButton className="px-6 py-2 text-xl" onClick={handleImageDetect}>
            Detect
          </ShinyButton>
        </CardFooter>
      </Card>

      {/* Video Detection */}
      <Card className="w-[350px] min-h-[500px] bg-zinc-900 border-zinc-800 text-white flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
        <div>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Video Detection</CardTitle>
            <CardDescription className="text-lg">
              Submit a video file to scan for unsafe content.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="video" className="text-lg">Upload Video</Label>
              <Input
                id="video"
                type="file"
                accept="video/*"
                className="bg-zinc-800 text-white h-30 file:text-black file:bg-purple-200 file:px-6 file:rounded-md"
              />
            </div>
            {loadingVideo ? (
              <div className="relative">
                <Skeleton className="h-12 w-full bg-zinc-800 animate-pulse" aria-busy="true" />
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-400 text-lg font-medium">
                  Processing...
                </p>
              </div>
            ) : videoResult ? (
              <div className="text-green-400 font-medium border p-3 rounded-md bg-zinc-900 text-lg">
                {videoResult}
              </div>
            ) : null}
          </CardContent>
        </div>
        <CardFooter className="flex justify-end p-4">
          <ShinyButton className="px-6 py-2 text-xl" onClick={handleVideoDetect}>
            Detect
          </ShinyButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Detect;