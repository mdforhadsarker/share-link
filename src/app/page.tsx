"use client";
import { useForm, useFieldArray } from "react-hook-form";
import PhoneMockup from "./components/PhoneMockup";
import { Github, Youtube, Linkedin } from "lucide-react"; // React Lucid Icons

export default function LinksForm() {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      links: [
        { platform: "GitHub", link: "https://github.com/username" },
        { platform: "YouTube", link: "https://youtube.com/user" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side - Phone Mockup */}
        <PhoneMockup links={fields} />

        {/* Right Side - Form */}
        <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Customize your links</h2>
          <p>
            add/edit/remove links below and then share all your profiles with
            the wolrd!
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <button
              type="button"
              onClick={() =>
                append({ platform: "GitHub", link: "https://github.com" })
              }
              className="block w-full mt-4 text-purple-600 border border-purple-600 rounded-lg py-2"
            >
              + Add new link
            </button>
            <div className="space-y-4 pt-10">
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 flex-col bg-slate-400 p-4"
                >
                  <div className="w-full">
                    <div className="flex justify-between ">
                      <label className="block mb-1 text-sm font-medium">
                        Platform
                      </label>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>

                    <select
                      {...register(`links.${index}.platform`)}
                      className="w-full border-gray-300 rounded-lg p-4"
                    >
                      <option value="GitHub">GitHub</option>
                      <option value="YouTube">YouTube</option>
                      <option value="LinkedIn">LinkedIn</option>
                    </select>
                  </div>

                  <div className="w-full">
                    <label className="block mb-1 text-sm font-medium">
                      Link
                    </label>
                    <input
                      {...register(`links.${index}.link`)}
                      className="w-full border-gray-300 rounded-lg p-4"
                      placeholder="https://"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
