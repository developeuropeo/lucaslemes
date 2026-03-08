import { NextRequest, NextResponse } from "next/server";
import { saveMessage } from "@/lib/message-store";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, project, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
        }

        // 1. Tentar salvar localmente (funciona no dev, falha silenciosamente no Vercel)
        await saveMessage({ name, email, project, message });

        // 2. Enviar e-mail se a chave do Resend estiver configurada
        if (resend) {
            const { error: emailError } = await resend.emails.send({
                from: "Portfolio Lucas Lemes <site@lucaslemes.com>",
                to: ["lucas.lemes@lucaslemes.com", "andresrsmg@gmail.com"],
                subject: `Nova Mensagem: ${name}`,
                html: `
                    <h2>Nova mensagem recebida pelo formulário do site</h2>
                    <p><strong>Nome:</strong> ${name}</p>
                    <p><strong>E-mail:</strong> ${email}</p>
                    <p><strong>Projeto:</strong> ${project || "Não especificado"}</p>
                    <p><strong>Mensagem:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
                `,
            });

            if (emailError) {
                console.error("Erro do Resend:", emailError);
                return NextResponse.json({
                    error: `Erro ao enviar e-mail: ${emailError.message} (${emailError.name})`
                }, { status: 500 });
            }
        } else {
            return NextResponse.json({ error: "Configuração de e-mail (Resend API Key) não encontrada no servidor." }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Erro no form de contato:", error);
        return NextResponse.json({
            error: "Erro ao processar mensagem: " + (error.message || "Erro desconhecido")
        }, { status: 500 });
    }
}
