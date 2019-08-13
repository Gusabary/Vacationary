#version 330 core

in vec3 Normal;
in vec3 FragPos;
in vec3 LightPos;

out vec4 FragColor;

uniform vec3 objectColor;
uniform vec3 lightColor;

void main()
{
    float ambientStrength = 0.1;
    float ambient = ambientStrength;

    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(LightPos - FragPos);
    float diffuse = max(dot(norm, lightDir), 0.0);

    float specularStrength = 0.5;
    int shininess = 32;
    vec3 viewDir = normalize(FragPos);
    vec3 reflectDir = reflect(-lightDir, norm);
    float specular = pow(max(dot(viewDir, reflectDir), 0.0), shininess) * specularStrength;

    vec3 result = (ambient + diffuse + specular) * lightColor * objectColor;
    FragColor = vec4(result, 1.0);
}