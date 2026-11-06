import PersonCard from "@/components/person/PersonCard";

type DirectorCardProps = {
  name: string;
  knownForMovieSlug: string;
  image?: string;
};

export default function DirectorCard({
  name,
  knownForMovieSlug,
  image,
}: DirectorCardProps) {
  return (
    <PersonCard
      name={name}
      role="director"
      knownForMovieSlug={knownForMovieSlug}
      image={image}
    />
  );
}
