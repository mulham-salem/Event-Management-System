import React from "react";
import {motion} from "framer-motion";
import {
    ArrowLeft,
    Mail,
    MapPin,
    Users,
    Calendar,
    Phone,
} from "lucide-react";
import {toast} from "react-hot-toast";
import {LogIn, AlertCircle, CheckCircle} from "lucide-react";
import type {EventDetails} from "../../api/events";

interface EventCardDetailsProps {
    event: EventDetails;
    onBack: () => void;
}

export const EventCardDetails: React.FC<EventCardDetailsProps> = ({event, onBack}) => {
    const coverImage =
        event.venue.images.find((img) => img.is_cover) ??
        event.venue.images[0];

    const accessToken = localStorage.getItem("authToken");
    const role = localStorage.getItem("currentRole");

    const isLoggedIn = Boolean(accessToken);
    const isClient = role === "client";

    const handleRegister = () => {
        if (!isLoggedIn) {
            toast.error("Please login to register for this event");
            return;
        }

        if (!isClient) {
            toast.error("Only clients can register for events");
            return;
        }

        // API register
        toast.success("Successfully registered for the event 🎉");
    };

    return (
        <motion.section
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 20}}
            transition={{duration: 0.25, ease: "easeOut"}}
            className="mx-auto mb-10 mt-6 w-full max-w-5xl rounded-3xl bg-white p-8 shadow-xl"
        >
            {/* Back */}
            <button
                onClick={onBack}
                className="mb-6 inline-flex items-center gap-2 font-nata-sans-md text-sm text-[#5a2ea6] hover:text-purple-700"
            >
                <ArrowLeft size={18} className="transition hover:translate-x-1" />
                Back to events
            </button>

            {/* Cover Image */}
            {coverImage && (
                <div className="mb-8 overflow-hidden rounded-2xl">
                    <img
                        src={coverImage.image_url}
                        alt={coverImage.alt_text}
                        className="h-[320px] w-full object-cover"
                    />
                </div>
            )}

            {/* Organizer */}
            <div className="mb-6 rounded-2xl bg-[#f6f1ff] p-5">
                <h3 className="mb-3 font-nata-sans-bd text-lg text-[#5a2ea6]">
                    Organizer
                </h3>

                <div className="flex flex-wrap gap-8 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                        <Users size={16}/>
                        <span>Name: {event.organizer.full_name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Mail size={16}/>
                        <span>Email: {event.organizer.email}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Phone size={16}/>
                        <span>Phone: {event.organizer.phone ?? "0000000000"}</span>
                    </div>
                </div>
            </div>

            {/* Venue */}
            <div className="mb-8">
                <h3 className="mb-4 font-nata-sans-bd text-lg text-gray-800">
                    Venue
                </h3>

                <div className="mb-4 flex flex-wrap gap-6 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-[#5a2ea6]"/>
                        <span>{event.venue.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Users size={16} className="text-[#5a2ea6]"/>
                        <span>Capacity: {event.venue.capacity}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-[#5a2ea6]"/>
                        <span>
                            Created at:{" "}
                            {new Date(event.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                {/* Map */}
                {event.venue.location_geo && (
                    <>
                        <div className="mb-6 overflow-hidden rounded-2xl border">
                            <iframe
                                title="Venue location"
                                src={`https://www.google.com/maps?q=${encodeURIComponent(
                                    event.venue.location_geo
                                )}&output=embed`}
                                className="h-[300px] w-full border-0"
                                loading="lazy"
                            />
                        </div>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                event.venue.location_geo
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center text-sm text-[#5a2ea6] hover:underline"
                        >
                            Open in Google Maps
                        </a>
                    </>
                )}
            </div>

            {/* Gallery */}
            {event.venue.images.length > 1 && (
                <div>
                    <h3 className="mb-4 font-nata-sans-bd text-lg text-gray-800">
                        Gallery
                    </h3>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        {event.venue.images.map((img) => (
                            <div
                                key={img.id}
                                className="overflow-hidden rounded-xl border"
                            >
                                <img
                                    src={img.image_url}
                                    alt={img.alt_text}
                                    className="h-32 w-full object-cover transition hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Action */}
            <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.25}}
                className="mt-10 flex justify-center"
            >

                <button
                    onClick={handleRegister}
                    disabled={isLoggedIn && !isClient}
                    className={`
                      group inline-flex items-center gap-2 rounded-xl px-8 py-3
                      font-nata-sans-md text-sm transition-all
                      ${
                            isLoggedIn && isClient
                                ? "bg-[#5a2ea6] text-white hover:bg-purple-800 active:scale-95"
                                : "cursor-not-allowed bg-gray-200 text-gray-500"
                        }
                    `}
                >
                    {!isLoggedIn && (
                        <>
                            <LogIn size={18} className="transition group-hover:scale-110" />
                            Login to register
                        </>
                    )}

                    {isLoggedIn && !isClient && (
                        <>
                            <AlertCircle size={18} className="transition group-hover:scale-110" />
                            Only clients can register
                        </>
                    )}

                    {isLoggedIn && isClient && (
                        <>
                            <CheckCircle size={18} className="transition group-hover:scale-110" />
                            Register for this event
                        </>
                    )}
                </button>
            </motion.div>
        </motion.section>
    );
};
