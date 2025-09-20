import Images from "@/utils/images";
import {
    photoSteps,
    photoFaq,
    videoSteps,
    videoFaqs,
    shortsFaq,
    shortsSteps,
    storySteps,
    storyFaq,
} from "@/dataStore/faqContent";

export const categoryContent = {
    video: {
        title: "Youtube Video Downloader",
        subtitle: "Download Videos from Youtube",
        placeholder: "Insert Youtube video link here...",
        about: {
            image: Images.Download,
            title: "Download Youtube Videos",
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
                "Please note that once you download the video from Youtube you are required to make it available for everyone to see it. In case you are not respecting this rule you will be restricted to download videos from private accounts. Rules are always to be respected!",
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
                "This FAQ answers common questions or worries people have about the YoutubeDl.app downloader. If you don't find the information you're looking for, you can send us an email through our contact page.",
            image: Images.Download,
            items: videoFaqs,
        },
    },
    photo: {
        title: "Youtube Photo Downloader",
        subtitle: "Download Photos from Youtube",
        placeholder: "Insert Youtube photo link here...",
        about: {
            image: Images.Download,
            title: "Download Youtube Photos",
            description: `In today's digital world, Youtube has become a popular place to share the moments of your life through pictures, covering many different topics. If you ever want to save a photo on your phone or computer, YoutubeDl is a helpful tool that makes it simple to download and keep any photo you like from Youtube. You can use it whether you're on a PC, Mac, Android, or iPhone, and downloading your favorite Youtube pictures is just a few clicks away.`,
            heading: "How to download Youtube photos?",
            smallDescription: `Check the steps below to easily use this Youtube picture downloader. It helps save you time and effort.`,
            steps: photoSteps,
        },
        downloadDescription: {
            heading: "Youtube Downloader",
            image: Images.DownloadTwo,
            title: "Photos Downloader",
            description: `You can now download several Youtube photos from any device you use, like a smartphone or computer, using the YoutubeDl downloader. This is a free online tool that doesn't require a subscription. Simply copy the link from the post where the photo is located and paste it into the correct field. Also, keep in mind that you can download more than one photo at a time with the YoutubeDl photo downloader. There's no set limit on how many photos you can download.`,
            link: "/photo",
        },
        faq: {
            title: "Frequently asked questions (FAQ)",
            intro: `This FAQ gives answers to common questions or worries people have about the YoutubeDl.app Youtube. If you don't find the information you're looking for, you can send us an email through our contact page.`,
            image: Images.Download,
            items: photoFaq,
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
            description: `Youtube Shorts is a new feature on Youtube that lets people make short videos, either 15 or 30 seconds long. With Youtube's strong editing tools, users can create and customize videos in their own unique way. However, Youtube does not allow people to directly download Shorts videos. To easily download Shorts videos, YoutubeDl is a simple tool that works well. It lets users download any Shorts video on different devices like computers, tablets, and phones, including iPhones and Android devices.`,
            link: "/shorts",
        },
        faq: {
            title: "Frequently asked questions (FAQ)",
            intro: `This FAQ gives answers to common questions or issues people have about the YoutubeDl.app Youtube Shorts downloader. If you don't find the answer you're looking for, you can send us an email through our contact page.`,
            image: Images.Download,
            items: shortsFaq,
        },
    },
    story: {
        title: "Youtube Story Downloader",
        subtitle: "Download your Youtube story and highlights easily!",
        placeholder: "Insert Youtube story link here...",
        about: {
            image: Images.Download,
            title: "Youtube Story saver",
            description: `Youtube Story Saver by YoutubeDl is the perfect tool for easily downloading any Youtube story directly to your device, all while staying completely private. Whether you want to re-upload, share again, or just save your favorite stories to your personal media collection for viewing with friends later, YoutubeDl makes it simple. There are no limits, so you can keep those memories safe and share the fun again and again. YoutubeDl's Story Saver is great for people who just browse Youtube and those who use it a lot, helping you save those quick, special moments shared in stories. Plus, you can use our tool right from your web browser—no need to download any extra apps! Enjoy the convenience and speed of YoutubeDl's Youtube Story Saver and never miss out on a story that grabs your attention.`,
            heading: "How to download Story Youtube?",
            smallDescription:
                "Only three easy and quickest steps to download an Youtube Story",
            steps: storySteps,
        },
        downloadDescription: {
            heading: "Youtube Story Download",
            headingDescription: `Youtube is a social media app where people can share stories and post them for their followers to see. You can make stories and highlights just like on Snapchat. Our website lets you download Youtube stories with just one click!`,
            image: Images.videoImg2,
            title: "Story Saver",
            description: `Remember, if you want to save a Story from Youtube, make sure it's set to public so everyone can see it. Follow this rule so you can download stories or highlights from your own accounts. Always follow the rules.`,
            link: "/story",
            secondImage: Images.videoImg1,
            secondTitle: "Story Downloader",
            secondDescription: `Also, you can download the Story online by just entering the Youtube Story link you want. This Youtube Story saver is free to use, and you don't need to create an account to use it. It's completely anonymous.`,
            secondLink: "/story",
        },
        faq: {
            title: "Frequently asked questions (FAQ)",
            intro: `This FAQ answers common questions or issues people have about the YoutubeDl.app Youtube story downloader. If you don't find the information you're looking for, you can send us an email through the contact page.`,
            image: Images.Download,
            items: storyFaq,
        },
    },
};
