import { db } from "../config/db";

import { categories } from "./schema/categories";
import { services } from "./schema/services";
import { slots } from "./schema/slots";
import { clinicSettings } from "./schema/clinicSettings";

import { generateSlots } from "../utils/generateSlots";
import { admins } from "./schema/admin";

import bcrypt from "bcrypt";

async function seed() {
  console.log("Starting seed...");
    await db.insert(categories).values([
    { name: "Skin" },
    { name: "Hair" },
    { name: "Nails" },
    { name: "Pediatric Dermatology" },
    { name: "Treatments" },
    ]);

    await db.insert(services).values([
    // Skin (categoryId: 1)
    {
        categoryId: 1,
        name: "Skin Tags / Warts / Moles"
    },
    {
        categoryId: 1,
        name: "Open Pores"
    },
    {
        categoryId: 1,
        name: "Stretch Marks"
    },
    {
        categoryId: 1,
        name: "Skin Pigmentation"
    },
    {
        categoryId: 1,
        name: "Acne / Acne Scars / Post Burn Scars"
    },
    {
        categoryId: 1,
        name: "Inflammatory Skin Disorders"
    },
    {
        categoryId: 1,
        name: "Lumps and Bumps"
    },
    {
        categoryId: 1,
        name: "Infections"
    },
    {
        categoryId: 1,
        name: "Infestations"
    },
    {
        categoryId: 1,
        name: "Sexually Transmitted Diseases (STDs)"
    },

    // Hair (categoryId: 2)
    {
        categoryId: 2,
        name: "Hair Fall Disorders"
    },
    {
        categoryId: 2,
        name: "Unwanted Hair Removal / Hirsutism"
    },
    {
        categoryId: 2,
        name: "Hair Transplantation"
    },

    // Nails (categoryId: 3)
    {
        categoryId: 3,
        name: "Nail Avulsion Surgeries"
    },
    {
        categoryId: 3,
        name: "Nail Biopsy"
    },
    {
        categoryId: 3,
        name: "Nail Matricectomy"
    },
    {
        categoryId: 3,
        name: "Nail Intralesional Therapies"
    },

    // Pediatric Dermatology (categoryId: 4)
    {
        categoryId: 4,
        name: "Pediatric Dermatology"
    },

    // Treatments (categoryId: 5)
    {
        categoryId: 5,
        name: "Chemical Peels"
    },
    {
        categoryId: 5,
        name: "Laser Hair Reduction"
    },
    {
        categoryId: 5,
        name: "Acne Scar Revision"
    },
    {
        categoryId: 5,
        name: "Phototherapy"
    },
    {
        categoryId: 5,
        name: "Hydrafacial"
    },
    {
        categoryId: 5,
        name: "Platelet Rich Plasma (PRP)"
    },
    {
        categoryId: 5,
        name: "Growth Factor Concentrate (GFC)"
    },
    {
        categoryId: 5,
        name: "LED Light Therapy"
    },
    {
        categoryId: 5,
        name: "Laser Tattoo Removal"
    },
    {
        categoryId: 5,
        name: "Microdermabrasion"
    },
    {
        categoryId: 5,
        name: "Skin Tightening Procedures"
    },
    {
        categoryId: 5,
        name: "Vampire Facial"
    },
    {
        categoryId: 5,
        name: "Mesotherapy"
    },
    {
        categoryId: 5,
        name: "Dermal Fillers"
    },
    {
        categoryId: 5,
        name: "Medifacials"
    },
    {
        categoryId: 5,
        name: "Facial Pigmentation Treatments"
    },
    {
        categoryId: 5,
        name: "Hair Transplantation"
    },
    {
        categoryId: 5,
        name: "Miscellaneous"
    },
  ]);
  const generatedSlots = generateSlots(
    "11:00",
    "13:00",
    15
  );

  await db.insert(slots).values(
    generatedSlots
  );
    await db.insert(clinicSettings).values({
    clinicName: "ABC Skin & Hair Clinic",

    clinicEmail:
      "appointments@clinic.com",

    bookingStartTime: "11:00",

    bookingEndTime: "13:00",

    slotDurationMinutes: 15
  });
    
    const passwordHash = await bcrypt.hash( "admin123", 10 );

    await db.insert(admins).values({
    username: "admin",
    passwordHash
    });
    console.log("Seed completed");
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  