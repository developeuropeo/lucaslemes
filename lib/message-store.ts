import { db } from "./db";
import { v4 as uuidv4 } from "uuid";

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    project: string;
    message: string;
    createdAt: string;
    read: boolean;
}

type MsgRow = {
    id: string; name: string; email: string; project: string;
    message: string; read: boolean; created_at: string;
};

function fromRow(row: MsgRow): ContactMessage {
    return {
        id: row.id,
        name: row.name,
        email: row.email,
        project: row.project,
        message: row.message,
        createdAt: row.created_at,
        read: row.read,
    };
}

export async function getMessages(): Promise<ContactMessage[]> {
    try {
        const rows = await db.from("contact_messages").select("*")
            .order("created_at", { ascending: false }).execute<MsgRow>();
        return rows.map(fromRow);
    } catch (e) {
        console.error("Erro ao buscar mensagens:", e);
        return [];
    }
}

export async function saveMessage(
    message: Omit<ContactMessage, "id" | "createdAt" | "read">
): Promise<ContactMessage> {
    const row: MsgRow = {
        id: uuidv4(),
        name: message.name,
        email: message.email,
        project: message.project ?? "",
        message: message.message,
        read: false,
        created_at: new Date().toISOString(),
    };
    try {
        const result = await db.from("contact_messages").insert(row).execute<MsgRow>();
        return fromRow(result);
    } catch (e) {
        console.error("Erro ao salvar mensagem:", e);
        return fromRow(row);
    }
}

export async function markAsRead(id: string): Promise<void> {
    try {
        await db.from("contact_messages").update({ read: true }).eq("id", id).execute<MsgRow>();
    } catch (e) {
        console.error("Erro ao marcar como lida:", e);
    }
}

export async function deleteMessage(id: string): Promise<void> {
    await db.from("contact_messages").delete().eq("id", id).execute();
}
