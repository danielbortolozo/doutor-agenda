import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, time, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});


export const clinicsTable = pgTable("clinics", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
  });

  export const clinicsTableRelations = relations(clinicsTable, ({ many }) => ({
    doctors: many(doctorsTable),
    patients: many(patientsTable),
    appointments: many(appointmentsTable),
    usersToClinics: many(usersToClinicsTable),
  }));

  export const doctorsTable = pgTable("doctors", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    avatarImageUrl: varchar({ length: 255 }).notNull(),
    specialty: varchar({ length: 255 }).notNull(),
    availableFromWeekDay: integer("available_from_week_day").notNull(),
    availableToWeekDay: integer("available_to_week_day").notNull(),
    availableFromTime: time("available_from_time").notNull(),
    availableToTime: time("available_to_time").notNull(),
    appointmentPriceInCents: integer("appointment_price_in_cents").notNull(),
    clinicId: uuid("clinic_id").references(() => clinicsTable.id, { onDelete: "cascade" }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
  });

  export const patientSexEnum = pgEnum("patient_sex", ["male", "female", "other"]);

  export const patientsTable = pgTable("patients", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    phoneNumber: varchar({ length: 255 }).notNull(), 
    sex: patientSexEnum("sex").notNull(),
    clinicId: uuid("clinic_id").references(() => clinicsTable.id, { onDelete: "cascade" }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
  });


  export const appointmentsTable = pgTable("appointments", {
    id: uuid("id").defaultRandom().primaryKey(),
    patientId: uuid("patient_id").references(() => patientsTable.id, { onDelete: "cascade" }).notNull(),
    doctorId: uuid("doctor_id").references(() => doctorsTable.id, { onDelete: "cascade" }).notNull(),
    clinicId: uuid("clinic_id").references(() => clinicsTable.id, { onDelete: "cascade" }).notNull(),
    appointmentDate: timestamp("appointment_date").notNull(),
    appointmentTime: time("appointment_time").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
  });


  export const doctorsTableRelations = relations(doctorsTable, ({ one }) => ({
    clinic: one(clinicsTable, {
      fields: [doctorsTable.clinicId],
      references: [clinicsTable.id],
    }),
  }));

  export const patientsTableRelations = relations(patientsTable, ({ one, many }) => ({
    clinic: one(clinicsTable, {
      fields: [patientsTable.clinicId],
      references: [clinicsTable.id],
    }),
    appointments: many(appointmentsTable),
  }));

  export const appointmentsTableRelations = relations(appointmentsTable, ({ one }) => ({
    patient: one(patientsTable, {
      fields: [appointmentsTable.patientId],
      references: [patientsTable.id],
    }),
    doctor: one(doctorsTable, {
      fields: [appointmentsTable.doctorId],
      references: [doctorsTable.id],
    }),
    clinic: one(clinicsTable, {
      fields: [appointmentsTable.clinicId],
      references: [clinicsTable.id],
    }),
  }));

  export const usersToClinicsTable = pgTable("users_to_clinics", {
    userId: uuid("user_id").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
    clinicId: uuid("clinic_id").references(() => clinicsTable.id, { onDelete: "cascade" }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
  });


  export const usersTablesRelations = relations(usersTable, ({ many }) => ({
    usersToClinics: many(usersToClinicsTable),
  }));
 
  export const usersToClinicsTableRelations = relations(usersToClinicsTable, ({ one }) => ({
    user: one(usersTable, {
      fields: [usersToClinicsTable.userId],
      references: [usersTable.id],
    }),
    clinic: one(clinicsTable, {
      fields: [usersToClinicsTable.clinicId],
      references: [clinicsTable.id],
    }),
  }));
  
  