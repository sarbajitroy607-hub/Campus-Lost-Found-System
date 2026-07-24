import React, { useState } from "react";
import { toast } from "sonner";
import { useCreateClaim } from "../../hooks/claimsHook/useCreateClaim.hook";

const CreateClaimModal = ({ match, item, onClose }) => {
  const { mutate, isPending } = useCreateClaim();

  const [form, setForm] = useState({
    message: "",
    contactInfo: "",
    proofImages: [],
  });

  const claimItem = match?.foundItemId ?? item;

  if (!claimItem) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(
      {
        itemId: claimItem._id,
        ...(match?._id && { matchId: match._id }),
        message: form.message,
        contactInfo: form.contactInfo,
        proofImages: form.proofImages,
      },
      {
        onSuccess: () => {
          toast.success("Claim submitted successfully");
          onClose();
        },
        onError: (error) => {
          toast.error(error.message || "Unable to submit your claim");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      <div className="bg-white w-full max-w-lg p-6 rounded-xl relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">
          📦 Create Claim
        </h2>

        {/* ITEM INFO */}
        <div className="mb-4 text-sm text-gray-600">
          Claiming:{" "}
          <span className="font-semibold">
            {claimItem.title}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <textarea
            placeholder="Explain why this item belongs to you..."
            className="w-full border p-2 rounded"
            value={form.message}
            minLength={10}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Contact Info"
            className="w-full border p-2 rounded"
            value={form.contactInfo}
            onChange={(e) =>
              setForm({ ...form, contactInfo: e.target.value })
            }
            required
          />

          <button
            disabled={isPending}
            className="w-full bg-indigo-600 text-white py-2 rounded"
          >
            {isPending ? "Submitting..." : "Submit Claim"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default CreateClaimModal;
