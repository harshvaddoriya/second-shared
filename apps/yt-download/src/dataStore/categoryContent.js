import Images from "@/utils/images";
import {
    playlistSteps,
    playlistFaq,
    videoSteps,
    videoFaqs,
    shortsFaq,
    shortsSteps,
} from "@/dataStore/faqContent";

export const categoryContent = {
    video: {
        title: "Youtube Video Downloader",
        subtitle: "Download Videos from Youtube",
        placeholder: "Insert Youtube video link here...",
        about: {
            image: Images.Download,
            title: "Download Youtube Videos",
            heading: "How to download Youtube videos?",
            description:
                "Explore a variety of interesting content on Youtube and get your favorite videos with YoutubeDl. This easy online tool lets you download Youtube videos anytime, without any limits. YoutubeDl lets you download as many videos as you want for watching offline, all with just a few simple steps.",
            smallDescription:
                "Here are the three simple and fastest ways to download an Youtube video.",
            steps: videoSteps,
        },
        downloadDescription: {
            heading: "YoutubeDl Downloader",
            image: Images.videoImg2,
            title: "Save videos",
            description:
                "Please note that once you download a video from YouTube, you must use it responsibly and respect copyright and content rules. Downloading videos from private or restricted accounts without permission is prohibited. Always follow YouTube’s guidelines when using downloaded content.",
            link: "/video",
            secondImage: Images.videoImg4,
            secondTitle: "Video Downloader",
            secondDescription:
                "Furthermore, what you should know is that the downloading of the videos can be done online by just typing the Youtube video link you like. This Youtube video Downloader provides its services absolutely free of any charge; no need to get an account as to become a member.",
            secondLink: "/video",
        },
        faq: {
            title: "Frequently asked questions (FAQ)",
            intro:
                "This FAQ answers common questions or worries people have about the YoutubeDl.app video downloader. If you don't find the information you're looking for, you can send us an email through our contact page.",
            image: Images.Download,
            items: videoFaqs,
        },
    },
    playlist: {
        title: "Youtube Playlist Downloader",
        subtitle: "Download Playlist from Youtube",
        placeholder: "Insert Youtube playlist link here...",
        about: {
            image: Images.Download,
            title: "Download Youtube Playlist",
            description: `In today's digital world, Youtube has become a popular place to share the moments of your life through videos content, covering many different topics. If you ever want to save a playlist on your phone or computer, YoutubeDl is a helpful tool that makes it simple to download and keep any playlist you like from Youtube. You can use it whether you're on a PC, Mac, Android, or iPhone, and downloading your favorite Youtube videos is just a few clicks away.`,
            heading: "How to download Youtube playlist?",
            smallDescription: `Check the steps below to easily use this Youtube playlist downloader. It helps save you time and effort.`,
            steps: playlistSteps,
        },
        downloadDescription: {
            heading: "Youtube Downloader",
            image: Images.DownloadTwo,
            title: "Playlist Downloader",
            description: `You can now download several Youtube Playlist from any device you use, like a smartphone or computer, using the YoutubeDl downloader. This is a free online tool that doesn't require a subscription. Simply copy the link from the videos where the playlist is located and paste it into the correct field. Also, keep in mind that you can download more than one videos at a time with the YoutubeDl playlist downloader. There's no set limit on how many playlist you can download.`,
            link: "/playlist",
        },
        faq: {
            title: "Frequently asked questions (FAQ)",
            intro: `This FAQ gives answers to common questions or worries people have about the YoutubeDl.app playlist download. If you don't find the information you're looking for, you can send us an email through our contact page.`,
            image: Images.Download,
            items: playlistFaq,
        },
    },
    shorts: {
        title: "  Youtube Shorts Downloader",
        subtitle: "Download Shorts from Youtube",
        placeholder: "Insert Youtube shorts link here...",
        about: {
            image: Images.Download,
            title: "Download Youtube Shorts Videos",
            description: `Shorts Downloader, which uses YoutubeDl, is an easy-to-use tool for downloading Youtube Shorts videos. You can easily save Shorts in mp4 format to your device. To get started, copy the Reel's link from Youtube and then paste it into YoutubeDl.app. This handy service makes it simple to download Youtube Shorts with just a few clicks.`,
            heading: "How to download Youtube Shorts?",
            smallDescription:
                "Check out the three simple steps to utilize this Youtube Shorts downloader. It's designed to save both time and effort.",
            steps: shortsSteps,
        },
        downloadDescription: {
            heading: "Youtube Shorts Downloader",
            image: Images.videoImg1,
            title: "Youtube Shorts Download",
            description: `Youtube Shorts is a new feature on Youtube that lets people make short videos, either 15 or 30 seconds long. With Youtube's strong editing tools, users can create and customize videos in their own unique way. To easily download Shorts videos, YoutubeDl is a simple tool that works well. It lets users download any Shorts video on different devices like computers, tablets, and phones, including iPhones and Android devices.`,
            link: "/shorts",
        },
        faq: {
            title: "Frequently asked questions (FAQ)",
            intro: `This FAQ gives answers to common questions or issues people have about the YoutubeDl.app Shorts downloader. If you don't find the answer you're looking for, you can send us an email through our contact page.`,
            image: Images.Download,
            items: shortsFaq,
        },
    },
};
