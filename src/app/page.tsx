import Container from "@/components/UI/Container";
import EmptyState from "@/components/UI/EmptyState";

export default function Home() {
  const isEmpty = true;
  if (isEmpty) {
    return <EmptyState />;
  }
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        <div>My future listings</div>
      </div>
    </Container>
  );
}
