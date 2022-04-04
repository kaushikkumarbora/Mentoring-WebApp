--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 17096)
-- Name: report; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.report (
    id bigint NOT NULL,
    mentor_id bigint NOT NULL,
    mentee_id bigint NOT NULL,
    description text NOT NULL,
    target_usertype bit(1) NOT NULL,
    status character varying(20) NOT NULL
);


ALTER TABLE public.report OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 17094)
-- Name: Report_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Report_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Report_id_seq" OWNER TO postgres;

--
-- TOC entry 3114 (class 0 OID 0)
-- Dependencies: 215
-- Name: Report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Report_id_seq" OWNED BY public.report.id;


--
-- TOC entry 212 (class 1259 OID 16806)
-- Name: chat_mapping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_mapping (
    id bigint NOT NULL,
    date date DEFAULT CURRENT_DATE NOT NULL,
    mentor_id bigint NOT NULL,
    mentee_id bigint NOT NULL
);


ALTER TABLE public.chat_mapping OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16774)
-- Name: mentor_mentee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mentor_mentee (
    start_date date NOT NULL,
    end_date date,
    mentor_id bigint NOT NULL,
    mentee_id bigint NOT NULL,
    id bigint NOT NULL
);


ALTER TABLE public.mentor_mentee OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16838)
-- Name: chat_period_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chat_period_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chat_period_id_seq OWNER TO postgres;

--
-- TOC entry 3115 (class 0 OID 0)
-- Dependencies: 213
-- Name: chat_period_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chat_period_id_seq OWNED BY public.mentor_mentee.id;


--
-- TOC entry 201 (class 1259 OID 16690)
-- Name: department; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.department (
    id bigint NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.department OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16688)
-- Name: department_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.department_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.department_id_seq OWNER TO postgres;

--
-- TOC entry 3116 (class 0 OID 0)
-- Dependencies: 200
-- Name: department_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.department_id_seq OWNED BY public.department.id;

--
-- TOC entry 220 (class 1259 OID 17139)
-- Name: event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event (
    id bigint NOT NULL,
    mentor_id bigint NOT NULL,
    mentee_id bigint NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone,
    description text,
    venue character varying(255) NOT NULL,
    date date NOT NULL,
    status character varying(20) NOT NULL
);


ALTER TABLE public.event OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17137)
-- Name: event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.event_id_seq OWNER TO postgres;

--
-- TOC entry 3117 (class 0 OID 0)
-- Dependencies: 219
-- Name: event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_id_seq OWNED BY public.event.id;


--
-- TOC entry 218 (class 1259 OID 17117)
-- Name: feedback; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.feedback (
    id bigint NOT NULL,
    mentor_id bigint NOT NULL,
    mentee_id bigint NOT NULL,
    description text NOT NULL,
    target_usertype boolean NOT NULL
);


ALTER TABLE public.feedback OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 17115)
-- Name: feedback_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.feedback_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feedback_id_seq OWNER TO postgres;

--
-- TOC entry 3118 (class 0 OID 0)
-- Dependencies: 217
-- Name: feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.feedback_id_seq OWNED BY public.feedback.id;


--
-- TOC entry 222 (class 1259 OID 17160)
-- Name: guardian; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.guardian (
    id bigint NOT NULL,
    first_name character varying(255)[] NOT NULL,
    last_name character varying(255)[],
    username character varying(255)[] NOT NULL,
    password text NOT NULL,
    mentee_id bigint NOT NULL
);


ALTER TABLE public.guardian OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17158)
-- Name: guardian_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.guardian_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.guardian_id_seq OWNER TO postgres;

--
-- TOC entry 3119 (class 0 OID 0)
-- Dependencies: 221
-- Name: guardian_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.guardian_id_seq OWNED BY public.guardian.id;


--
-- TOC entry 205 (class 1259 OID 16717)
-- Name: mentee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mentee (
    id bigint NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255),
    username character varying(255) NOT NULL,
    password text NOT NULL,
    dob date,
    disabled boolean NOT NULL
);


ALTER TABLE public.mentee OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16715)
-- Name: mentee_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mentee_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mentee_id_seq OWNER TO postgres;

--
-- TOC entry 3120 (class 0 OID 0)
-- Dependencies: 204
-- Name: mentee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mentee_id_seq OWNED BY public.mentee.id;


--
-- TOC entry 203 (class 1259 OID 16698)
-- Name: mentor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mentor (
    id bigint NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255),
    username character varying(255) NOT NULL,
    password text NOT NULL,
    dob date,
    dept_id bigint DEFAULT 1 NOT NULL,
    disabled boolean NOT NULL
);


ALTER TABLE public.mentor OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16696)
-- Name: mentor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mentor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mentor_id_seq OWNER TO postgres;

--
-- TOC entry 3121 (class 0 OID 0)
-- Dependencies: 202
-- Name: mentor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mentor_id_seq OWNED BY public.mentor.id;


--
-- TOC entry 207 (class 1259 OID 16730)
-- Name: mentor_register_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mentor_register_info (
    id bigint NOT NULL,
    mentor_id bigint NOT NULL,
    date_register date NOT NULL,
    date_recuse date
);


ALTER TABLE public.mentor_register_info OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16787)
-- Name: message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.message (
    chat_id bigint NOT NULL,
    text text NOT NULL,
    "time" time without time zone DEFAULT CURRENT_TIME NOT NULL,
    date date DEFAULT CURRENT_DATE NOT NULL,
    id bigint NOT NULL,
    message_by character varying(20) NOT NULL
);


ALTER TABLE public.message OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 17064)
-- Name: message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.message_id_seq OWNER TO postgres;

--
-- TOC entry 3122 (class 0 OID 0)
-- Dependencies: 214
-- Name: message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.message_id_seq OWNED BY public.message.id;


--
-- TOC entry 206 (class 1259 OID 16728)
-- Name: register_serial_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.register_serial_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.register_serial_seq OWNER TO postgres;

--
-- TOC entry 3123 (class 0 OID 0)
-- Dependencies: 206
-- Name: register_serial_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.register_serial_seq OWNED BY public.mentor_register_info.id;


--
-- TOC entry 211 (class 1259 OID 16804)
-- Name: session_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.session_id_seq OWNER TO postgres;

--
-- TOC entry 3124 (class 0 OID 0)
-- Dependencies: 211
-- Name: session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.session_id_seq OWNED BY public.chat_mapping.id;


--
-- TOC entry 209 (class 1259 OID 16784)
-- Name: today_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.today_messages (
    date date NOT NULL,
    message_id bigint NOT NULL
);


ALTER TABLE public.today_messages OWNER TO postgres;

--
-- TOC entry 2930 (class 2604 OID 16809)
-- Name: chat_mapping id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_mapping ALTER COLUMN id SET DEFAULT nextval('public.session_id_seq'::regclass);


--
-- TOC entry 2921 (class 2604 OID 16693)
-- Name: department id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department ALTER COLUMN id SET DEFAULT nextval('public.department_id_seq'::regclass);


--
-- TOC entry 2934 (class 2604 OID 17142)
-- Name: event id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event ALTER COLUMN id SET DEFAULT nextval('public.event_id_seq'::regclass);


--
-- TOC entry 2933 (class 2604 OID 17120)
-- Name: feedback id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback ALTER COLUMN id SET DEFAULT nextval('public.feedback_id_seq'::regclass);


--
-- TOC entry 2935 (class 2604 OID 17163)
-- Name: guardian id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guardian ALTER COLUMN id SET DEFAULT nextval('public.guardian_id_seq'::regclass);


--
-- TOC entry 2924 (class 2604 OID 16720)
-- Name: mentee id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentee ALTER COLUMN id SET DEFAULT nextval('public.mentee_id_seq'::regclass);


--
-- TOC entry 2922 (class 2604 OID 16701)
-- Name: mentor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor ALTER COLUMN id SET DEFAULT nextval('public.mentor_id_seq'::regclass);


--
-- TOC entry 2926 (class 2604 OID 16840)
-- Name: mentor_mentee id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor_mentee ALTER COLUMN id SET DEFAULT nextval('public.chat_period_id_seq'::regclass);


--
-- TOC entry 2925 (class 2604 OID 16733)
-- Name: mentor_register_info id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor_register_info ALTER COLUMN id SET DEFAULT nextval('public.register_serial_seq'::regclass);


--
-- TOC entry 2927 (class 2604 OID 17066)
-- Name: message id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message ALTER COLUMN id SET DEFAULT nextval('public.message_id_seq'::regclass);


--
-- TOC entry 2932 (class 2604 OID 17099)
-- Name: report id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report ALTER COLUMN id SET DEFAULT nextval('public."Report_id_seq"'::regclass);


--
-- TOC entry 2956 (class 2606 OID 17104)
-- Name: report Report_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report
    ADD CONSTRAINT "Report_pkey" PRIMARY KEY (id);


--
-- TOC entry 2954 (class 2606 OID 16869)
-- Name: chat_mapping chat_mappings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_mapping
    ADD CONSTRAINT chat_mappings_pkey PRIMARY KEY (id, date);


--
-- TOC entry 2937 (class 2606 OID 16695)
-- Name: department department_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (id);


--
-- TOC entry 2960 (class 2606 OID 17147)
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);


--
-- TOC entry 2958 (class 2606 OID 17125)
-- Name: feedback feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (id);


--
-- TOC entry 2962 (class 2606 OID 17168)
-- Name: guardian guardian_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guardian
    ADD CONSTRAINT guardian_pkey PRIMARY KEY (id);


--
-- TOC entry 2964 (class 2606 OID 17170)
-- Name: guardian guardian_username; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guardian
    ADD CONSTRAINT guardian_username UNIQUE (username, mentee_id);


--
-- TOC entry 2943 (class 2606 OID 16725)
-- Name: mentee mentee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentee
    ADD CONSTRAINT mentee_pkey PRIMARY KEY (id);


--
-- TOC entry 2945 (class 2606 OID 16727)
-- Name: mentee mentee_uname; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentee
    ADD CONSTRAINT mentee_uname UNIQUE (username);


--
-- TOC entry 2949 (class 2606 OID 16867)
-- Name: mentor_mentee mentor_mentee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor_mentee
    ADD CONSTRAINT mentor_mentee_pkey PRIMARY KEY (id);


--
-- TOC entry 2939 (class 2606 OID 16707)
-- Name: mentor mentor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor
    ADD CONSTRAINT mentor_pkey PRIMARY KEY (id);


--
-- TOC entry 2947 (class 2606 OID 16735)
-- Name: mentor_register_info mentor_register_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor_register_info
    ADD CONSTRAINT mentor_register_info_pkey PRIMARY KEY (id);


--
-- TOC entry 2941 (class 2606 OID 16709)
-- Name: mentor mentor_uname; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor
    ADD CONSTRAINT mentor_uname UNIQUE (username);


--
-- TOC entry 2952 (class 2606 OID 17075)
-- Name: message message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (chat_id, date, id);


--
-- TOC entry 2950 (class 1259 OID 16865)
-- Name: fki_message_session_id_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_message_session_id_date ON public.message USING btree (chat_id, date);


--
-- TOC entry 2977 (class 2606 OID 17153)
-- Name: event event_mentee_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_mentee_id FOREIGN KEY (mentee_id) REFERENCES public.mentee(id);


--
-- TOC entry 2976 (class 2606 OID 17148)
-- Name: event event_mentor_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_mentor_id FOREIGN KEY (mentor_id) REFERENCES public.mentor(id);


--
-- TOC entry 2975 (class 2606 OID 17131)
-- Name: feedback feedback_mentee_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_mentee_id FOREIGN KEY (mentee_id) REFERENCES public.mentee(id);


--
-- TOC entry 2974 (class 2606 OID 17126)
-- Name: feedback feedback_mentor_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_mentor_id FOREIGN KEY (mentor_id) REFERENCES public.mentor(id);


--
-- TOC entry 2978 (class 2606 OID 17171)
-- Name: guardian guardian_mentee_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guardian
    ADD CONSTRAINT guardian_mentee_id FOREIGN KEY (mentee_id) REFERENCES public.mentee(id);


--
-- TOC entry 2965 (class 2606 OID 16710)
-- Name: mentor mentor_dept; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor
    ADD CONSTRAINT mentor_dept FOREIGN KEY (dept_id) REFERENCES public.department(id);


--
-- TOC entry 2966 (class 2606 OID 16831)
-- Name: mentor_mentee mentor_mentee_mentee_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor_mentee
    ADD CONSTRAINT mentor_mentee_mentee_id FOREIGN KEY (mentee_id) REFERENCES public.mentee(id);


--
-- TOC entry 2967 (class 2606 OID 16826)
-- Name: mentor_mentee mentor_mentee_mentor_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor_mentee
    ADD CONSTRAINT mentor_mentee_mentor_id FOREIGN KEY (mentor_id) REFERENCES public.mentor(id);


--
-- TOC entry 2968 (class 2606 OID 16882)
-- Name: mentor_mentee mentor_mentee_mentor_mentee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mentor_mentee
    ADD CONSTRAINT mentor_mentee_mentor_mentee FOREIGN KEY (id) REFERENCES public.mentor_mentee(id);


--
-- TOC entry 2969 (class 2606 OID 16876)
-- Name: message message_chat_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_chat_id FOREIGN KEY (chat_id, date) REFERENCES public.chat_mapping(id, date);


--
-- TOC entry 2973 (class 2606 OID 17110)
-- Name: report report_mentee_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report
    ADD CONSTRAINT report_mentee_id FOREIGN KEY (mentee_id) REFERENCES public.mentee(id);


--
-- TOC entry 2972 (class 2606 OID 17105)
-- Name: report report_mentor_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report
    ADD CONSTRAINT report_mentor_id FOREIGN KEY (mentor_id) REFERENCES public.mentor(id);


--
-- TOC entry 2971 (class 2606 OID 16819)
-- Name: chat_mapping session_mentee_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_mapping
    ADD CONSTRAINT session_mentee_id FOREIGN KEY (mentee_id) REFERENCES public.mentee(id);


--
-- TOC entry 2970 (class 2606 OID 16814)
-- Name: chat_mapping session_mentor_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_mapping
    ADD CONSTRAINT session_mentor_id FOREIGN KEY (mentor_id) REFERENCES public.mentor(id);

INSERT INTO public.department (name) VALUES ('Computer Science and Engineering'), ('Mechanical Engineering'), ('Electrical and Electronics Engineering'), ('Civil Engineering');

-- Completed on 2022-04-05 00:16:55

--
-- PostgreSQL database dump complete
--
