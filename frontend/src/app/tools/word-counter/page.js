import WordTool from "./wordCount";

export const metadata = {
  title: "Free Word & Character Counter Online | ArvestaDev",
  description: "Count words, characters, and sentences in real-time. A simple, free text tool to check your document length instantly.",
  alternates: {
    canonical: "https://arvestadev.com/tools/word-counter",
  },
};

export default function ImageCompressorPage() {
  return (
    <div>
     
      <WordTool />
    </div>
  );
}