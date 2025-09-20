import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User as UserIcon, Loader2, Brain, Sparkles, MessageSquare } from "lucide-react";
import { InvokeLLM } from "@/api/integrations";
import ReactMarkdown from 'react-markdown';
import { User } from "@/api/entities";

const AIMessage = ({ text }) => (
    <div className="flex items-start gap-4 mb-6">
        <Avatar className="w-10 h-10 border-2 border-blue-200 shadow-sm">
            <AvatarFallback className="bg-blue-600 text-white">
                <Brain className="w-5 h-5" />
            </AvatarFallback>
        </Avatar>
        <div className="bg-white rounded-2xl rounded-tl-md p-4 max-w-3xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">MINDHUE AI</span>
            </div>
            <ReactMarkdown className="prose prose-sm max-w-none text-slate-700">{text}</ReactMarkdown>
        </div>
    </div>
);

const UserMessage = ({ text }) => (
    <div className="flex items-start gap-4 justify-end mb-6">
        <div className="bg-blue-600 text-white rounded-2xl rounded-tr-md p-4 max-w-2xl shadow-sm">
            <p className="text-sm leading-relaxed">{text}</p>
        </div>
        <Avatar className="w-10 h-10 border-2 border-slate-200 shadow-sm">
             <AvatarFallback className="bg-slate-600 text-white">
                <UserIcon className="w-5 h-5" />
            </AvatarFallback>
        </Avatar>
    </div>
);

const SuggestedQuestions = ({ onSelectQuestion }) => {
    const suggestions = [
        "What are the signs of diabetic retinopathy?",
        "How do I interpret ERG results?",
        "When should I refer a patient to a specialist?",
        "What's the difference between AMD and diabetic macular edema?",
        "How accurate is AI in fundus image analysis?",
        "What are the best practices for fundus photography?"
    ];

    return (
        <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-600 mb-3">Suggested Questions:</h3>
            <div className="flex flex-wrap gap-2">
                {suggestions.map((question, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => onSelectQuestion(question)}
                        className="text-xs border-slate-300 hover:border-blue-400 hover:text-blue-600 transition-colors"
                    >
                        {question}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const messagesEndRef = React.useRef(null);

    useEffect(() => {
        User.me().then(setUser).catch(() => setUser(null));
        setMessages([
            { 
                sender: 'ai', 
                text: `Hello! I'm your MINDHUE AI medical assistant, specialized in ophthalmology and retinal diseases. I can help you with:

• **Diagnostic Insights** - Explain fundus image findings and ERG results
• **Clinical Guidance** - Treatment recommendations and referral decisions  
• **Medical Education** - Latest research and best practices
• **Platform Support** - How to use MINDHUE features effectively

What would you like to know today?` 
            }
        ]);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (question = null) => {
        const messageText = question || input.trim();
        if (!messageText || isLoading) return;

        const newMessages = [...messages, { sender: 'user', text: messageText }];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        try {
            const prompt = `
                You are MINDHUE AI, a specialized medical AI assistant focused on ophthalmology and retinal diseases.
                
                Your expertise includes:
                - Fundus image analysis and interpretation
                - ERG (Electroretinography) results analysis
                - Retinal diseases (AMD, diabetic retinopathy, macular edema, etc.)
                - Treatment protocols and clinical guidelines
                - When to refer patients to specialists
                - Latest research in ophthalmology
                
                User context: ${user ? `Medical professional - ${user.full_name} (${user.email})` : 'Healthcare professional (not logged in)'}
                
                User question: "${messageText}"
                
                Provide a comprehensive, medically accurate response that:
                1. Is professional and clinically relevant
                2. Uses appropriate medical terminology
                3. Includes specific recommendations when applicable
                4. Mentions when specialist consultation is needed
                5. Cites evidence-based practices when relevant
                
                Format your response in markdown for better readability.
            `;

            const response = await InvokeLLM({ prompt });
            
            setMessages([...newMessages, { sender: 'ai', text: response }]);
        } catch (error) {
            setMessages([...newMessages, { 
                sender: 'ai', 
                text: 'I apologize, but I encountered a technical issue. Please try again, or contact our support team if the problem persists. Your question is important to me!' 
            }]);
            console.error('AI Chat error:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-0 bg-white min-h-[600px] flex flex-col">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-bold text-slate-900">
                                MINDHUE AI Medical Assistant
                            </CardTitle>
                            <p className="text-sm text-slate-600 mt-1">
                                Specialized in Ophthalmology & Retinal Disease Analysis
                            </p>
                        </div>
                        <div className="ml-auto">
                            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Online
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex-1 p-6 overflow-y-auto bg-slate-50">
                    {messages.length <= 1 && (
                        <SuggestedQuestions onSelectQuestion={handleSend} />
                    )}
                    
                    <div className="space-y-1">
                        {messages.map((msg, index) => 
                            msg.sender === 'ai' 
                                ? <AIMessage key={index} text={msg.text} /> 
                                : <UserMessage key={index} text={msg.text} />
                        )}
                        
                        {isLoading && (
                            <div className="flex items-start gap-4 mb-6">
                                <Avatar className="w-10 h-10 border-2 border-blue-200 shadow-sm">
                                    <AvatarFallback className="bg-blue-600 text-white">
                                        <Brain className="w-5 h-5" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="bg-white rounded-2xl rounded-tl-md p-4 shadow-sm border border-slate-200">
                                    <div className="flex items-center gap-3">
                                        <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                                        <span className="text-sm text-slate-600">Analyzing your question...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </CardContent>

                <div className="p-6 border-t bg-white">
                    <div className="flex gap-3">
                        <div className="flex-1 relative">
                            <Input 
                                placeholder="Ask about diagnosis, treatment protocols, or clinical guidelines..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isLoading}
                                className="pr-12 h-12 border-slate-300 focus:border-blue-500 rounded-xl"
                            />
                            <MessageSquare className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        </div>
                        <Button 
                            onClick={() => handleSend()}
                            disabled={isLoading || !input.trim()}
                            className="h-12 px-6 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Send className="w-5 h-5" />
                            )}
                        </Button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
                        <span>Powered by advanced medical AI • Always consult qualified healthcare professionals</span>
                        <span>{user ? `Logged in as ${user.full_name}` : 'Guest session'}</span>
                    </div>
                </div>
            </Card>
        </div>
    );
}