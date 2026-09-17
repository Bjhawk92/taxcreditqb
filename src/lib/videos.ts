import { SITE } from "@/lib/site";

/**
 * Film Room library.
 *
 * To publish a clip:
 * 1. Set `videoSrc` to the hosted mp4/webm URL (or `/film-room/your-clip.mp4`).
 * 2. Set `captionsSrc` to a WebVTT file and keep `captionsLabel`.
 * 3. Set `runtime` (e.g. "1:48") — it stays hidden until this is filled.
 * 4. Swap `thumbnail.src` for a still from the recording.
 *
 * Leave `videoSrc` empty to keep the card in Coming Soon (no play button).
 */
export type FilmFormat =
  | "QB Breakdown"
  | "Deck Walkthrough"
  | "Presentation Breakdown"
  | "Marketing Demo"
  | "Deal Breakdown";

export type FilmTopic =
  | "questions"
  | "city"
  | "hearing"
  | "marketing"
  | "site"
  | "team";

export type FilmClip = {
  id: string;
  topic: FilmTopic;
  format: FilmFormat;
  title: string;
  description: string;
  thumbnail: {
    src: string;
    alt: string;
    caption: string;
  };
  /** mm:ss. Empty until the clip is uploaded. */
  runtime: string;
  /** Public URL. Empty = Coming Soon. */
  videoSrc: string;
  /** WebVTT captions. Empty until captions are produced. */
  captionsSrc: string;
  captionsLabel: string;
};

export const FILM_CLIPS: FilmClip[] = [
  {
    id: "tough-questions",
    topic: "questions",
    format: "QB Breakdown",
    title: "Handling the Tough Questions",
    description:
      "Property values. Traffic. Who will live here? See how to address common neighborhood objections with clear answers and credible project information.",
    thumbnail: {
      src: "/film-room/tough-questions.jpg",
      alt: "Brett Johnson beside the question: Will this hurt property values?",
      caption: "",
    },
    runtime: "",
    videoSrc: "",
    captionsSrc: "",
    captionsLabel: "English captions",
  },
  {
    id: "city-meeting",
    topic: "city",
    format: "Deck Walkthrough",
    title: "Your First Meeting with the City",
    description:
      "Make your first introduction count. See how to present your track record, explore local housing needs, and gauge support before committing to a market or site.",
    thumbnail: {
      src: "/film-room/city-meeting.jpg",
      alt: "Municipal Introduction deck cover with two supporting slides behind it.",
      caption: "",
    },
    runtime: "",
    videoSrc: "",
    captionsSrc: "",
    captionsLabel: "English captions",
  },
  {
    id: "public-hearing",
    topic: "hearing",
    format: "Presentation Breakdown",
    title: "Before the Public Hearing",
    description:
      "Walk through a site-specific presentation that explains your development, makes LIHTC understandable, and addresses the questions your audience is likely to bring.",
    thumbnail: {
      src: "/film-room/public-hearing.jpg",
      alt: "Abstract site plan beside a neighborhood Q&A slide.",
      caption: "",
    },
    runtime: "",
    videoSrc: "",
    captionsSrc: "",
    captionsLabel: "English captions",
  },
  {
    id: "ai-story",
    topic: "marketing",
    format: "Marketing Demo",
    title: "AI That Helps Tell Your Story",
    description:
      "See how we use AI alongside development experience to create clearer neighborhood flyers, brochures, and project information.",
    thumbnail: {
      src: "/film-room/ai-story.jpg",
      alt: "Before-and-after: rough project notes next to a finished community flyer.",
      caption: "",
    },
    runtime: "",
    videoSrc: "",
    captionsSrc: "",
    captionsLabel: "English captions",
  },
  {
    id: "site-strategy",
    topic: "site",
    format: "Deal Breakdown",
    title: "From Site to Strategy",
    description:
      "A promising site is only the beginning. Learn what to ask about land terms, local approvals, and timing before moving further into a deal.",
    thumbnail: {
      src: "/film-room/site-strategy.jpg",
      alt: "Marked-up parcel map with restrained annotations for site control, access, and zoning.",
      caption: "",
    },
    runtime: "",
    videoSrc: "",
    captionsSrc: "",
    captionsLabel: "English captions",
  },
  {
    id: "right-people",
    topic: "team",
    format: "QB Breakdown",
    title: "The Right People. The Right Play.",
    description: `Some deals need another specialist at the table. See how we help connect the development strategy with the people who can execute it. When the work needs a model, ${SITE.alkaline.name} is the named modeling partner.`,
    thumbnail: {
      src: "/film-room/right-people.jpg",
      alt: "Playbook diagram with Brett Johnson at the QB node, connected to architect, contractor, syndicator, and modeling.",
      caption: "",
    },
    runtime: "",
    videoSrc: "",
    captionsSrc: "",
    captionsLabel: "English captions",
  },
];

export function isFilmReady(clip: FilmClip) {
  return Boolean(clip.videoSrc);
}
