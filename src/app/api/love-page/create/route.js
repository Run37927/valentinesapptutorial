import prisma from "@/lib/db";

export async function POST(req) {
    try {
        const { userId, slug } = await req.json();

        // basic validation
        if (!userId || !slug) {
            return Response.json({ error: "Missing required fields" }, { status: 400 })
        }

        // check if user exists and has paid
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { order: true }
        })

        if (!user) {
            return Response.json({ error: "user not found" }, { status: 404 });
        }

        if (!user.order?.isPaid) {
            return Response.json({ error: "payment required" }, { status: 403 });
        }

        // check if slug is already taken
        const existingPage = await prisma.lovePage.findUnique({
            where: { slug }
        })

        if (existingPage) {
            return Response.json({ error: "this name is already taken" }, { status: 400 })
        }

        // create new love page
        const lovePage = await prisma.lovePage.create({
            data: {
                userId,
                slug,
                content: {
                    steps: [
                        {
                            id: 1,
                            type: "simple",
                            title: "Will you be my valentine?",
                            options: [
                                { id: "yes", text: "Yes" },
                                { id: "no", text: "I no no wanna .·°՞(≧□≦)՞°·." }
                            ],
                            image: {
                                src: "/please.gif",
                                alt: "please"
                            }
                        },
                        {
                            id: 2,
                            type: "conditional",
                            condition: { q1: "yes" },
                            title: "Thank you",
                            subtitle: "Don't go yet...",
                            image: {
                                src: "/rizz.gif",
                                alt: "rizz"
                            },
                            options: [
                                { id: "yes", text: "Click me UWU" }
                            ]
                        },
                        {
                            id: 3,
                            type: "conditional",
                            condition: { q1: "no" },
                            image: {
                                src: "/sad.gif",
                                alt: "sad"
                            }
                        },
                        {
                            id: 4,
                            type: "calendar",
                            title: "Are you free on...",
                            subtitle: "Select a date",
                            requiresDate: true,
                            buttonText: "Submit"
                        },
                        {
                            id: 5,
                            type: "grid",
                            title: "What food would you like to eat?",
                            buttonText: "Continue UWU",
                            options: [
                                { id: "hotdog", text: "hot dog", image: "/food/hotdog.png" },
                                { id: "sushi", text: "sushi", image: "/food/sushi.png" },
                                { id: "korean", text: "Korean", image: "/food/korean.png" },
                                { id: "pasta", text: "Pasta", image: "/food/pasta.png" },
                                { id: "pizza", text: "Pizza", image: "/food/pizza.png" },
                                { id: "steak", text: "Steak", image: "/food/steak.png" },
                                { id: "poke", text: "Poke", image: "/food/poke.png" },
                                { id: "pho", text: "Pho", image: "/food/pho.png" },
                                { id: "hotpot", text: "Hotpot", image: "/food/hotpot.png" }
                            ]
                        },
                        {
                            id: 6,
                            type: "grid",
                            title: "Which dessert are we eating?",
                            buttonText: "Continue UWU",
                            options: [
                                { id: "che", text: "che", image: "/dessert/che.png" },
                                { id: "churro", text: "churro", image: "/dessert/churro.png" },
                                { id: "mochi", text: "mochi", image: "/dessert/mochi.png" },
                                { id: "taiyaki", text: "taiyaki", image: "/dessert/taiyaki.png" },
                                { id: "cheesecake", text: "cheesecake", image: "/dessert/cheesecake.png" },
                                { id: "boba", text: "boba", image: "/dessert/boba.png" }
                            ]
                        },
                        {
                            id: 7,
                            type: "grid",
                            title: "What would you like to do after?",
                            buttonText: "Continue UWU",
                            options: [
                                { id: "arcade", text: "Arcade", image: "/place/arcade.png" },
                                { id: "cinema", text: "Cinema", image: "/place/cinema.png" },
                                { id: "park", text: "Park", image: "/place/park.png" },
                                { id: "museum", text: "Museum", image: "/place/museum.png" },
                                { id: "ceramics", text: "Ceramics", image: "/place/ceramics.png" },
                                { id: "gallery", text: "Art Gallery", image: "/place/gallery.png" },
                                { id: "aquarium", text: "Aquarium", image: "/place/aquarium.png" },
                                { id: "mall", text: "Mall", image: "/place/mall.png" },
                                { id: "karaoke", text: "Karaoke", image: "/place/karaoke.png" }
                            ]
                        },
                        {
                            id: 8,
                            type: "final",
                            title: "Thank you for being my girlfriend (づ ◕‿◕ )づ",
                            image: {
                                src: "/final.gif",
                                alt: "final"
                            }
                        }
                    ],
                    settings: {
                        currentStep: 1,
                    }
                },
                responses: {
                    answers: {}
                },
                published: false
            }
        })

        return Response.json(lovePage)
    } catch (error) {
        console.error("Error creating love page:", error);
        return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
}