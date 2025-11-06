import user_image from './user-image.jpg';
import code_icon from './code-icon.png';
import code_icon_dark from './code-icon-dark.png';
import edu_icon from './edu-icon.png';
import edu_icon_dark from './edu-icon-dark.png';
import project_icon from './project-icon.png';
import project_icon_dark from './project-icon-dark.png';
import vscode from './vscode.png';
import firebase from './firebase.png';
import figma from './figma.png';
import git from './git.png';
import mongodb from './mongodb.png';
import right_arrow_white from './right-arrow-white.png';
import logo from './logo.png';
import logo_dark from './ilijadark.png';
import mail_icon from './mail_icon.png';
import mail_icon_dark from './mail_icon_dark.png';
import profile_img from './profile-img.png';
import download_icon from './download-icon.png';
import hand_icon from './hand-icon.png';
import header_bg_color from './header-bg-color.png';
import moon_icon from './moon_icon.png';
import sun_icon from './sun_icon.png';
import arrow_icon from './arrow-icon.png';
import arrow_icon_dark from './arrow-icon-dark.png';
import menu_black from './menu-black.png';
import menu_white from './menu-white.png';
import close_black from './close-black.png';
import close_white from './close-white.png';
import web_icon from './web-icon.png';
import mobile_icon from './mobile-icon.png';
import ui_icon from './ui-icon.png';
import graphics_icon from './graphics-icon.png';
import right_arrow from './right-arrow.png';
import send_icon from './send-icon.png';
import right_arrow_bold from './right-arrow-bold.png';
import right_arrow_bold_dark from './right-arrow-bold-dark.png';
import docker from './docker.png';
import dotnet from './dotnet.png'
import vs from './visualstudio.png';
import ssms from './ssms.png';
import react from './react.png';
import nodejs from './nodejs.png';
import tutor from './tutor.png';
import member from './member.png'
import iaeste from './iaestelogo.png'

export const assets = {
    user_image,
    code_icon,
    member,
    iaeste,
    code_icon_dark,
    edu_icon,
    edu_icon_dark,
    project_icon,
    project_icon_dark,
    vscode,
    firebase,
    figma,
    git,
    mongodb,
    right_arrow_white,
    logo,
    logo_dark,
    mail_icon,
    mail_icon_dark,
    profile_img,
    download_icon,
    hand_icon,
    header_bg_color,
    moon_icon,
    sun_icon,
    arrow_icon,
    arrow_icon_dark,
    menu_black,
    menu_white,
    close_black,
    close_white,
    web_icon,
    mobile_icon,
    ui_icon,
    graphics_icon,
    right_arrow,
    send_icon,
    right_arrow_bold,
    right_arrow_bold_dark,
    nodejs,
    docker,
    react,
    ssms,
    dotnet,
    vs,
    tutor
};

export const workData = [
    {
        title: 'Port Optimization With AI',
        description: 'Hackathon Project - Full-Stack App',
        bgImage: '/work-1.png',
    },
    {
        title: 'Personal Portfolio Website',
        description: 'Web Development',
        bgImage: '/work-2.png',
    },
    {
        title: 'AI Chatbot SaaS Platform',
        description: 'In Development',
        bgImage: '/work-3.png',
    },
    {
        title: 'Restaurant Management System',
        description: 'In Progress – Full-Stack Application',
        bgImage: '/work-4.png',
    },
]

export const serviceData = [
    { icon: assets.tutor, title: 'Student Tutor',
        organization: "FAMNIT - University of Primorska",
    description: 'Supporting fellow students by explaining course topics, answering questions, and sharing study strategies to make learning easier and more enjoyable.',
     details: {
      location: "Koper, Slovenia",
      period: "01/09/2025 – Present",
      highlights: [
        "Improving student confidence by explaining complex topics in simple, clear ways",
        "Encouraging collaborative learning and peer discussion",
        "Developing my technical and teaching skills while supporting others",
      ],
      links: [
        { label: "FAMNIT Website", href: "https://www.famnit.upr.si/en/education/tutoring-system" },
      ],
    },
    link: "#", },
    { icon: assets.member, title: 'Active Member',
        organization: "MSOS - Macedonian Student Organization in Slovenia",
    description: 'Being an active part of a motivated team that brings students closer through meaningful events and shared experiences. Through these activities, I’ve developed strong teamwork and organizational skills while helping create a more connected and supportive student community.',
     details: {
      location: "Koper, Slovenia",
      period: "01/05/2025 – Present",
      highlights: [
        "Learning teamwork, organization, and event management through hands-on involvement",
        "Contributing creative ideas to improve engagement and participation",
        "Helping coordinate academic and cultural activities throughout the year",
      ],
      links: [
        { label: "MSOS Website", href: "https://www.msosorg.com/" },
      ],
    },
    link: "#", },

    { icon: assets.edu_icon, title: 'GDG on Campus – Social Media Manager',
        organization: "Google Developer Group",
        description: 'As part of the organizing team, I help plan and run developer events, manage registrations, and assist attendees during workshops. I also handle social media promotion to boost event engagement and create a welcoming community atmosphere.',
        details: {
            period: 'Oct 2024 – Present',
            location: 'Koper, Slovenia',    
            highlights: [
                'Planned and supported developer events on campus',
                'Handled coordination between teams and speakers',
                'Recently joined the team and excited to contribute more',
            ],
            links: [
                { label: "GDG Website", href: "https://developers.google.com/community/gdg" },
            ],
        },
    },

    {
        icon: assets.iaeste,
        title: 'IT Team Member',
        organization: "IAESTE Slovenia",
        description: 'As part of IAESTE Slovenia’s IT team, I help maintain and improve the organization’s digital tools, ensuring smooth communication and collaboration across student members and international partners.',
        link: "https://iaeste.si",
        details: {
            period: 'October 2025 – Present',
            location: 'Slovenia',
            highlights: [
                "Supporting website updates and digital infrastructure",
                "Collaborating with team members to optimize internal systems",
                "Enhancing tech-based solutions to improve student exchange coordination"
            ],
            links: [
                { label: "IAESTE Webiste", href: "https://iaeste.si" },
            ],
        }
    }
]

export const infoList = [
    { icon: assets.code_icon, iconDark: assets.code_icon_dark, title: 'Languages', description: 'HTML, CSS, JavaScript React Js, Next Js' },
    { icon: assets.edu_icon, iconDark: assets.edu_icon_dark, title: 'Education', description: 'B.Tech in Computer Science' },
    { icon: assets.project_icon, iconDark: assets.project_icon_dark, title: 'Projects', description: 'Built more than 5 projects' }
];

export const toolsData = [
    assets.dotnet, assets.react, assets.vs, assets.vscode, assets.firebase, 
    assets.figma, assets.git, assets.docker, assets.ssms, assets.nodejs
];

export const duplicatedTools = [...toolsData, ...toolsData];
