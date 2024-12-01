// lib
import { useCallback, useState } from "react";
import { MapPin, Star, Edit, Heart, Trash2 as Trash } from "lucide-react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

// components
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DestinationForm } from "@/components/DestinationForm";
import { Tombstone } from "./Tombstone";

// hooks
import { useDestinationByIdQuery } from "@/hooks/useDestinationByIdQuery";
import { useDeleteDestinationMutation } from "@/hooks/useDeleteDestinationMutation";
import { useMarkFavoriteMutation } from "@/hooks/useMarkFavoriteMutation";
import { useUpdateMutation } from "@/hooks/useUpdateMutation";

// types
import type { Destination } from "@/types";

export function Detail({ id }: { id: string }) {
  const { destination, loading } = useDestinationByIdQuery({ id });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const updateDestination = useUpdateMutation();
  const deleteDestination = useDeleteDestinationMutation();
  const isFavorite = destination?.favorite;

  const toggleFavorite = useMarkFavoriteMutation({ isFavorite });

  const onSubmit = useCallback(
    (_values: Partial<Destination>) => {
      // TODO: call destination mutation here
      updateDestination({ id, _values });
      setIsModalOpen(false);
    },
    [id, updateDestination]
  );

  const handleDelete = useCallback(() => {
    // TODO: call destination mutation here
    deleteDestination({ id });
  }, [deleteDestination, id]);

  const addOrRemovefavorite = useCallback(() => {
    // TODO: add handling for favorite here
    toggleFavorite({ markFavoriteId: id });
  }, [id, toggleFavorite]);

  if (loading) {
    return <Tombstone />;
  }

  if (!destination) {
    return <header>No Destination Found</header>;
  }

  return (
    <div className="w-full h-full flex flex-col items-center gap-8 pt-8">
      <header className="relative h-96 w-full max-w-screen-lg">
        <img
          src={`https://picsum.photos/seed/${destination.name}/2000/1000`}
          alt={destination.name}
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center rounded-2xl">
          <h1 className="text-5xl font-bold text-white text-center mb-8">
            {destination.name}
          </h1>
          <div className="flex space-x-2">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </DialogTrigger>
              <DestinationForm
                key={`${isModalOpen}`}
                destination={destination}
                onSubmit={onSubmit}
              />
            </Dialog>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash className="h-4 w-4" />
              Delete
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white rounded-full"
              onClick={() => addOrRemovefavorite()}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart
                className={
                  isFavorite ? "text-red-500 fill-red-500" : "text-gray-500"
                }
              />
            </Button>
          </div>
        </div>
      </header>
      <main className="w-full max-w-screen-lg flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg p-6 mb-8"
        >
          <p className="text-lg mb-4">{destination.description}</p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin size={20} />
              <span>{destination.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-400" size={20} />
              <span className="font-semibold">
                {destination.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </motion.div>
      </main>
      <Toaster />
    </div>
  );
}
