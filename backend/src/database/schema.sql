-- Centauri Medical Frailty Assessment Database Schema
-- PostgreSQL Database

-- Users table (stores CLEAR verified user information)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clear_psuid VARCHAR(255) UNIQUE NOT NULL,
    clear_verification_id VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(50),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_verified_at TIMESTAMP WITH TIME ZONE
);

-- Assessment sessions table
CREATE TABLE IF NOT EXISTS assessment_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'in_progress', -- in_progress, completed, abandoned
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Assessment responses table (stores user answers)
CREATE TABLE IF NOT EXISTS assessment_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES assessment_sessions(id) ON DELETE CASCADE,
    question_id INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    user_response TEXT NOT NULL,
    response_type VARCHAR(50) NOT NULL, -- boolean, text, array, number
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Assessment results table
CREATE TABLE IF NOT EXISTS assessment_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES assessment_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    eligible BOOLEAN NOT NULL,
    confidence_score DECIMAL(5,2), -- 0.00 to 100.00
    rule_based_score INTEGER,
    ml_predicted_score DECIMAL(5,2),
    reasons JSONB, -- Array of reasons supporting the determination
    factors JSONB, -- Detailed factors that contributed to decision
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Medical conditions table (extracted from assessment)
CREATE TABLE IF NOT EXISTS medical_conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES assessment_sessions(id) ON DELETE CASCADE,
    condition_name VARCHAR(255) NOT NULL,
    is_chronic BOOLEAN DEFAULT true,
    severity VARCHAR(50), -- mild, moderate, severe
    diagnosed_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Functional limitations table (ADL limitations)
CREATE TABLE IF NOT EXISTS functional_limitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES assessment_sessions(id) ON DELETE CASCADE,
    limitation_type VARCHAR(100) NOT NULL, -- bathing, dressing, eating, etc.
    requires_assistance BOOLEAN DEFAULT true,
    assistance_level VARCHAR(50), -- minimal, moderate, maximum
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Health records metadata (for Centauri API integration)
CREATE TABLE IF NOT EXISTS health_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    record_type VARCHAR(100), -- C-CDA, FHIR, PDF, etc.
    source VARCHAR(255), -- Centauri, Manual Upload, etc.
    record_data JSONB, -- Normalized health record data
    retrieved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Audit log table (HIPAA compliance)
CREATE TABLE IF NOT EXISTS audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100),
    resource_id UUID,
    ip_address INET,
    user_agent TEXT,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_users_clear_psuid ON users(clear_psuid);
CREATE INDEX idx_assessment_sessions_user_id ON assessment_sessions(user_id);
CREATE INDEX idx_assessment_sessions_status ON assessment_sessions(status);
CREATE INDEX idx_assessment_responses_session_id ON assessment_responses(session_id);
CREATE INDEX idx_assessment_results_user_id ON assessment_results(user_id);
CREATE INDEX idx_assessment_results_session_id ON assessment_results(session_id);
CREATE INDEX idx_medical_conditions_user_id ON medical_conditions(user_id);
CREATE INDEX idx_functional_limitations_user_id ON functional_limitations(user_id);
CREATE INDEX idx_health_records_user_id ON health_records(user_id);
CREATE INDEX idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assessment_sessions_updated_at BEFORE UPDATE ON assessment_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
