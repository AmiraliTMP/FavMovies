import PersonCard from "@/components/person/PersonCard";

type ActorCardProps = {
  name: string;
  knownForMovieSlug: string;
  image?: string;
};

export default function ActorCard({
  name,
  knownForMovieSlug,
  image,
}: ActorCardProps) {
  return (
    <PersonCard
      name={name}
      role="actor"
      knownForMovieSlug={knownForMovieSlug}
      image={image}
    />
  );
}
