import Images from "@/utils/images";
import {
  carouselSteps,
  carouselFaq,
  igtvSteps,
  igtvFaq,
  photoSteps,
  photoFaq,
  videoSteps,
  videoFaqs,
  reelsFaq,
  reelsSteps,
  storySteps,
  storyFaq,
  viewSteps,
  viewFaq,
} from "@/dataStore/faqContent";

export const categoryContent = {
  video: {
    title: "Instagram Video Downloader",
    subtitle: "Download Videos from Instagram",
    placeholder: "Insert Instagram video link here...",
    about: {
      image: Images.Download,
      title: "Download Instagram Videos",
      description:
        "Explore a variety of interesting content on Instagram and get your favorite videos with InstaDl. This easy online tool lets you download Instagram videos anytime, without any limits. InstaDl lets you download as many videos as you want for watching offline, all with just a few simple steps.",
      smallDescription:
        "Here are the three simple and fastest ways to download an Instagram video.",
      steps: videoSteps,
    },
    downloadDescription: {
      heading: "InstaDl Downloader",
      image: Images.videoImg2,
      title: "Save videos",
      description:
        "Please note that once you download the video from Instagram you are required to make it available for everyone to see it. In case you are not respecting this rule you will be restricted to download videos from private accounts. Rules are always to be respected!",
      link: "/video",
      secondImage: Images.videoImg4,
      secondTitle: "Video Downloader",
      secondDescription:
        "Furthermore, what you should know is that the downloading of the videos can be done online by just typing the Instagram video link you like. This Instagram video Downloader provides its services absolutely free of any charge; no need to get an account as to become a member.",
      secondLink: "/video",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro:
        "This FAQ answers common questions or worries people have about the InstaDl.app downloader. If you don't find the information you're looking for, you can send us an email through our contact page.",
      image: Images.Download,
      items: videoFaqs,
    },
  },
  carousel: {
    title: "IG Carousel Downloader",
    subtitle: "Download carousel from Instagram",
    placeholder: "Insert Instagram carousel link here...",
    about: {
      image: Images.Download,
      title: "Download Instagram Carousels",
      description: `Many Instagram users are familiar with the term "Instagram carousel." It's a type of post that includes several photos or videos, and you can swipe left or click to view them. This format helps grab attention as you scroll through the app. Now, you don't have to wonder if you can download multiple photos from a carousel post. We've made it easy for you. Use our Instagram downloader to save images and mixed content that includes both photos and videos."      heading: "How to download Instagram carousel posts?`,
      smallDescription:
        "Instagram carousel posts can now be downloaded and saved fast and easily. In just three steps, you will get the joy of delighting your eyes while watching your favorite photos",
      steps: carouselSteps,
    },
    downloadDescription: {
      heading: "Carousel Downloader",
      headingDescription: `Instagram is a social media app where people can share stories and show them to their friends. You can make stories and save them in highlights, just like on Snapchat. Our site lets you download Instagram stories with just one click!`,
      image: Images.videoImg3,
      title: "Album Downloader",
      description: `It has always been hard to download an Instagram carousel post. You just need to paste the link of the carousel post without having to look through the source code or find a photo link. It is completely safe and secure because all the photos and videos are downloaded directly from the Instagram server.`,
      link: "/carousel",
      secondImage: Images.DownloadTwo,
      secondTitle: "Download multiple photos",
      secondDescription: `The online Instagram tool lets you download multiple photos for free. It works for even the biggest images, saving them in high quality and keeping their original look. You can get HD images and videos from Instagram using this downloader.`,
      secondLink: "/carousel",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro: `This FAQ gives answers to common questions or issues people have about the InstaDl.app downloader. If you don't find the answer you're looking for, you can send us an email through our contact page.`,
      image: Images.Download,
      items: carouselFaq,
    },
  },
  igtv: {
    title: "IGTV Downloader",
    subtitle: "Instagram IGTV Video Download",
    placeholder: "Insert Instagram igtv link here...",
    about: {
      image: Images.Download,
      title: "Download Instagram IGTV Videos",
      description: `Discover an easy, fast, and efficient method to download Instagram videos with our IGTV Video Downloader. While scrolling through Instagram, you may come across an IGTV video that you like. Saving it to your device is really simple. Just copy the video's URL, paste it into the special box on the InstaDl website, and click the Download button. And there you go—your video is ready to watch offline.`,
      heading: "How to download IGTV Instagram?",
      smallDescription: `To download an IGTV video, just follow these simple steps as explained below.`,
      steps: igtvSteps,
    },
    downloadDescription: {
      heading: "Download IGTV Videos",
      headingDescription: `Instagram is a social media app where people can share short updates called stories with their friends. You can make stories and even save them in special sections like Snapchat. Our website lets you download Instagram stories with just one click!`,
      image: Images.videoImg2,
      title: "IGTV Downloader",
      description:
        "After clicking the Download button, you want to check if the video has been downloaded. So, no matter what device you use, a smartphone, a tablet, a Mac, or a PC, the IGTV video will be downloaded in the default Download folder. There should be no compatibility problems.",
      link: "/igtv",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro: `This FAQ answers common questions or worries people have about the InstaDl.app IGTV downloader. If you don't find the information you're looking for, you can reach out to us by email using the contact page.`,
      image: Images.Download,
      items: igtvFaq,
    },
  },
  photo: {
    title: "Instagram Photo Downloader",
    subtitle: "Download Photos from Instagram",
    placeholder: "Insert Instagram photo link here...",
    about: {
      image: Images.Download,
      title: "Download Instagram Photos",
      description: `In today's digital world, Instagram has become a popular place to share the moments of your life through pictures, covering many different topics. If you ever want to save a photo on your phone or computer, InstaDl is a helpful tool that makes it simple to download and keep any photo you like from Instagram. You can use it whether you're on a PC, Mac, Android, or iPhone, and downloading your favorite Instagram pictures is just a few clicks away.`,
      heading: "How to download Instagram photos?",
      smallDescription: `Check the steps below to easily use this Instagram picture downloader. It helps save you time and effort.`,
      steps: photoSteps,
    },
    downloadDescription: {
      heading: "InstaDl Downloader",
      image: Images.DownloadTwo,
      title: "Photos Downloader",
      description: `You can now download several Instagram photos from any device you use, like a smartphone or computer, using the InstaDl downloader. This is a free online tool that doesn't require a subscription. Simply copy the link from the post where the photo is located and paste it into the correct field. Also, keep in mind that you can download more than one photo at a time with the InstaDl photo downloader. There's no set limit on how many photos you can download.`,
      link: "/photo",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro: `This FAQ gives answers to common questions or worries people have about the InstaDl.app Instagram photo downloader. If you don't find the information you're looking for, you can send us an email through our contact page.`,
      image: Images.Download,
      items: photoFaq,
    },
  },
  reels: {
    title: "Instagram Reels Downloader",
    subtitle: "Download Reels from Instagram",
    placeholder: "Insert Instagram reels link here...",
    about: {
      image: Images.Download,
      title: "Download Instagram Reels Videos",
      description: `Reels Downloader, which uses InstaDl, is an easy-to-use tool for downloading Instagram Reels videos. You can easily save Reels in mp4 format to your device. To get started, copy the Reel's link from Instagram and then paste it into InstaDl.app. This handy service makes it simple to download Instagram Reels with just a few clicks.`,
      heading: "How to download Instagram Reels?",
      smallDescription:
        "Check out the three simple steps to utilize this Instagram Reels downloader. It's designed to save both time and effort.",
      steps: reelsSteps,
    },
    downloadDescription: {
      heading: "InstaDl Reels Downloader",
      image: Images.videoImg1,
      title: "Instagram Reels Download",
      description: `Instagram Reels is a new feature on Instagram that lets people make short videos, either 15 or 30 seconds long. With Instagram's strong editing tools, users can create and customize videos in their own unique way. However, Instagram does not allow people to directly download Reels videos. To easily download Reels videos, InstaDl is a simple tool that works well. It lets users download any Reels video on different devices like computers, tablets, and phones, including iPhones and Android devices.`,
      link: "/reels",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro: `This FAQ gives answers to common questions or issues people have about the InstaDl.app Instagram Reels downloader. If you don't find the answer you're looking for, you can send us an email through our contact page.`,
      image: Images.Download,
      items: reelsFaq,
    },
  },
  story: {
    title: "Instagram Story Downloader",
    subtitle: "Download your Instagram story and highlights easily!",
    placeholder: "Insert Instagram story link here...",
    about: {
      image: Images.Download,
      title: "Instagram Story saver",
      description: `Instagram Story Saver by InstaDl is the perfect tool for easily downloading any Instagram story directly to your device, all while staying completely private. Whether you want to re-upload, share again, or just save your favorite stories to your personal media collection for viewing with friends later, InstaDl makes it simple. There are no limits, so you can keep those memories safe and share the fun again and again. InstaDl's Story Saver is great for people who just browse Instagram and those who use it a lot, helping you save those quick, special moments shared in stories. Plus, you can use our tool right from your web browser—no need to download any extra apps! Enjoy the convenience and speed of InstaDl's Instagram Story Saver and never miss out on a story that grabs your attention.`,
      heading: "How to download Story Instagram?",
      smallDescription:
        "Only three easy and quickest steps to download an Instagram Story",
      steps: storySteps,
    },
    downloadDescription: {
      heading: "Instagram Story Download",
      headingDescription: `Instagram is a social media app where people can share stories and post them for their followers to see. You can make stories and highlights just like on Snapchat. Our website lets you download Instagram stories with just one click!`,
      image: Images.videoImg2,
      title: "Story Saver",
      description: `Remember, if you want to save a Story from Instagram, make sure it's set to public so everyone can see it. Follow this rule so you can download stories or highlights from your own accounts. Always follow the rules.`,
      link: "/story",
      secondImage: Images.videoImg1,
      secondTitle: "Story Downloader",
      secondDescription: `Also, you can download the Story online by just entering the Instagram Story link you want. This Instagram Story saver is free to use, and you don't need to create an account to use it. It's completely anonymous.`,
      secondLink: "/story",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro: `This FAQ answers common questions or issues people have about the InstaDl.app Instagram story downloader. If you don't find the information you're looking for, you can send us an email through the contact page.`,
      image: Images.Download,
      items: storyFaq,
    },
  },
  viewer: {
    title: "Instagram Stories Viewer",
    subtitle: "Anonymously Instagram Story Viewer",
    placeholder: "Insert Instagram viewer link here...",
    about: {
      image: Images.Download,
      title: "Instagram Stories Viewer",
      description:
        "InstaDl Instagram Stories Viewer is a complimentary tool that enables anonymous viewing of Instagram stories from public profiles without the need for Instagram user authentication. The platform offers a range of free features, allowing you to discreetly view stories without any extra steps, other than entering the user's Instagram handle.",
      heading: "How to use Instagram Story Viewer?",
      smallDescription:
        "See below the three easy steps to use this Instagram Story Viewer. It saves time and energy.",
      steps: viewSteps,
    },
    downloadDescription: {
      heading: "InstaDl Story Viewer",
      headingDescription: `An Instagram viewer is a website or app that lets you check Instagram posts, stories, and profiles without needing an account or logging in.`,
      image: Images.videoImg1,
      title: "Instagram Stories Viewer",
      description: `Right now, Instagram users can't download or save stories, highlights, or reels directly from the app. But there's a tool called the Instagram Stories viewer that let's users do this. Also, there's the InstaDl Instagram Highlights viewer, which lets you check public user stories without being logged in, and it works on any device.`,
      link: "/viewer",
    },
    faq: {
      title: "Frequently asked questions (FAQ)",
      intro: `This FAQ answers common questions or worries people have about the InstaDl.app Instagram viewer. If you don't find the information you're looking for, you can send us an email through our contact page.`,
      image: Images.Download,
      items: viewFaq,
    },
  },
};
