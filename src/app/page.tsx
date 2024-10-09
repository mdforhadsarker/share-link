"use client";

"use client";
import { useForm, useFieldArray } from "react-hook-form";
import PhoneMockup from "./components/PhoneMockup";
import { Github, Youtube, Linkedin, ChevronDown, Link2 } from "lucide-react";

export default function LinksForm() {
  const { control, register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      links: [
        { platform: "GitHub", link: "" },
        { platform: "YouTube", link: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const onSubmit = (data) => console.log(data);

  const platformOptions = [
    { value: "GitHub", label: "GitHub", icon: <Github className="mr-2" /> },
    { value: "YouTube", label: "YouTube", icon: <Youtube className="mr-2" /> },
    {
      value: "LinkedIn",
      label: "LinkedIn",
      icon: <Linkedin className="mr-2" />,
    },
  ];

  // Watch the platform values to get the selected platform
  const selectedPlatforms = watch("links");

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side - Phone Mockup */}
        <PhoneMockup links={fields} />

        {/* Right Side - Form */}
        <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Customize your links</h2>
          <p>
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <button
              type="button"
              onClick={() =>
                append({ platform: "GitHub", link: "" })
              }
              className="block w-full mt-4 text-purple-600 border border-purple-600 rounded-lg py-2"
            >
              + Add new link
            </button>
            <div className="space-y-4 pt-10">
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 flex-col bg-slate-200 p-4 rounded-lg"
                >
                  <div className="w-full">
                    <div className="flex justify-between">
                      <h1 className="text-lg font-bold text-gray-600">
                        Link #{index + 1}
                      </h1>

                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>

                    <label className="block mb-1 text-sm font-medium">
                      Platform
                    </label>
                    {/* Custom Select Dropdown */}
                    <div className="relative">
                      <div className="relative w-full border-gray-300 border rounded-lg p-4 flex items-center justify-between cursor-pointer">
                        <div className="flex items-center space-x-2">
                          {
                            platformOptions.find(
                              (option) =>
                                option.value ===
                                selectedPlatforms[index]?.platform
                            )?.icon
                          }
                          <span>
                            {
                              platformOptions.find(
                                (option) =>
                                  option.value ===
                                  selectedPlatforms[index]?.platform
                              )?.label
                            }
                          </span>
                        </div>
                        <ChevronDown className="ml-2" />
                      </div>

                      {/* Select dropdown options */}
                      <select
                        {...register(`links.${index}.platform`)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        onChange={(e) => {
                          const selectedPlatform = e.target.value;
                          setValue(`links.${index}.platform`, selectedPlatform);
                        }}
                      >
                        {platformOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="block mb-1 text-sm font-medium">
                      Link
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      {/* Add the link icon here */}
                      <div className="flex items-center p-5">
                        <Link2 className="w-5 h-5" />
                      </div>
                      <input
                        {...register(`links.${index}.link`)}
                        className="flex-grow p-4 rounded-lg"
                        placeholder="https://"
                      />
                    </div>
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
